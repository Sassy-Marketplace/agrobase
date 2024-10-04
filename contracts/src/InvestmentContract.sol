
// File: src/InvestmentContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract InvestmentContract {
    struct Investment {
        address investor;
        uint256 amount;
        uint256 shares;
        uint256 timestamp;
        bool active;
    }

    struct Asset {
        address tokenAddress;
        bool isERC721;
        uint256 totalShares;
        uint256 totalInvestment;
        mapping(address => Investment) investments;
        address[] investors;
    }

    struct Campaign {
        string name;
        uint256 startTime;
        uint256 duration;
        uint256 goal;
        uint256 totalInvested;
        address nftAddress;
        bool isActive;
        mapping(address => uint256) investments;
        address[] investors;
    }

    mapping(bytes32 => Asset) public assets;
    mapping(bytes32 => Campaign) public campaigns;
    bytes32[] public assetIds;
    bytes32[] public campaignIds;
    mapping(address => bytes32[]) public profileCampaigns;

    uint256 public constant SHARES_DECIMALS = 18;
    uint256 public investmentFee = 100; // 1% fee (base 10000)
    uint256 public withdrawalFee = 200; // 2% fee (base 10000)

    address public owner;

    event AssetAdded(bytes32 indexed assetId, address indexed tokenAddress, bool isERC721);
    event Invested(bytes32 indexed assetId, address indexed investor, uint256 amount, uint256 shares);
    event Withdrawn(bytes32 indexed assetId, address indexed investor, uint256 amount, uint256 shares);
    event FeesUpdated(uint256 investmentFee, uint256 withdrawalFee);
    event CampaignCreated(bytes32 indexed campaignId, string name, uint256 duration, uint256 goal, address nftAddress);
    event CampaignInvestment(bytes32 indexed campaignId, address indexed investor, uint256 amount);
    event CampaignEnded(bytes32 indexed campaignId, bool successful);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAsset(address _tokenAddress, bool _isERC721) external onlyOwner {
        bytes32 assetId = keccak256(abi.encodePacked(_tokenAddress, _isERC721));
        require(assets[assetId].tokenAddress == address(0), "Asset already exists");

        Asset storage newAsset = assets[assetId];
        newAsset.tokenAddress = _tokenAddress;
        newAsset.isERC721 = _isERC721;
        assetIds.push(assetId);

        emit AssetAdded(assetId, _tokenAddress, _isERC721);
    }

    function invest(bytes32 _assetId, uint256 _amount) external {
        require(_amount > 0, "Investment amount must be greater than 0");
        Asset storage asset = assets[_assetId];
        require(asset.tokenAddress != address(0), "Asset does not exist");

        uint256 fee = (_amount * investmentFee) / 10000;
        uint256 investmentAmount = _amount - fee;

        if (asset.isERC721) {
            IERC721 nft = IERC721(asset.tokenAddress);
            require(nft.ownerOf(_amount) == msg.sender, "You don't own this NFT");
            nft.transferFrom(msg.sender, address(this), _amount);
        } else {
            IERC20 token = IERC20(asset.tokenAddress);
            require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        }

        uint256 shares = calculateShares(asset, investmentAmount);
        
        if (asset.investments[msg.sender].amount == 0) {
            asset.investors.push(msg.sender);
        }

        asset.investments[msg.sender].investor = msg.sender;
        asset.investments[msg.sender].amount += investmentAmount;
        asset.investments[msg.sender].shares += shares;
        asset.investments[msg.sender].timestamp = block.timestamp;
        asset.investments[msg.sender].active = true;

        asset.totalShares += shares;
        asset.totalInvestment += investmentAmount;

        emit Invested(_assetId, msg.sender, investmentAmount, shares);
    }

    function withdraw(bytes32 _assetId, uint256 _shares) external {
        Asset storage asset = assets[_assetId];
        require(asset.tokenAddress != address(0), "Asset does not exist");
        require(asset.investments[msg.sender].active, "No active investment found");
        require(_shares > 0 && _shares <= asset.investments[msg.sender].shares, "Invalid shares amount");

        uint256 amount = (_shares * asset.totalInvestment) / asset.totalShares;
        uint256 fee = (amount * withdrawalFee) / 10000;
        uint256 withdrawalAmount = amount - fee;

        asset.investments[msg.sender].shares -= _shares;
        asset.investments[msg.sender].amount -= amount;
        asset.totalShares -= _shares;
        asset.totalInvestment -= amount;

        if (asset.investments[msg.sender].shares == 0) {
            asset.investments[msg.sender].active = false;
            removeInvestor(_assetId, msg.sender);
        }

        if (asset.isERC721) {
            IERC721(asset.tokenAddress).transferFrom(address(this), msg.sender, withdrawalAmount);
        } else {
            require(IERC20(asset.tokenAddress).transfer(msg.sender, withdrawalAmount), "Transfer failed");
        }

        emit Withdrawn(_assetId, msg.sender, withdrawalAmount, _shares);
    }

    function calculateShares(Asset storage _asset, uint256 _amount) internal view returns (uint256) {
        if (_asset.totalShares == 0 || _asset.totalInvestment == 0) {
            return _amount * (10**SHARES_DECIMALS);
        }
        return (_amount * _asset.totalShares) / _asset.totalInvestment;
    }

    function removeInvestor(bytes32 _assetId, address _investor) internal {
        Asset storage asset = assets[_assetId];
        for (uint256 i = 0; i < asset.investors.length; i++) {
            if (asset.investors[i] == _investor) {
                asset.investors[i] = asset.investors[asset.investors.length - 1];
                asset.investors.pop();
                break;
            }
        }
    }

    function getInvestmentDetails(bytes32 _assetId, address _investor) external view returns (uint256 amount, uint256 shares, uint256 timestamp, bool active) {
        Investment storage investment = assets[_assetId].investments[_investor];
        return (investment.amount, investment.shares, investment.timestamp, investment.active);
    }

    function getAssetInvestors(bytes32 _assetId) external view returns (address[] memory) {
        return assets[_assetId].investors;
    }

    function updateFees(uint256 _investmentFee, uint256 _withdrawalFee) external onlyOwner {
        require(_investmentFee <= 1000 && _withdrawalFee <= 1000, "Fees cannot exceed 10%");
        investmentFee = _investmentFee;
        withdrawalFee = _withdrawalFee;
        emit FeesUpdated(investmentFee, withdrawalFee);
    }

    function withdrawFees(address _token) external onlyOwner {
        if (_token == address(0)) {
            uint256 balance = address(this).balance;
            require(balance > 0, "No fees to withdraw");
            payable(owner).transfer(balance);
        } else {
            IERC20 token = IERC20(_token);
            uint256 balance = token.balanceOf(address(this));
            require(balance > 0, "No fees to withdraw");
            require(token.transfer(owner, balance), "Fee transfer failed");
        }
    }

    function createCampaign(string memory _name, uint256 _duration, uint256 _goal, address _nftAddress) external onlyOwner returns (bytes32) {
        bytes32 campaignId = keccak256(abi.encodePacked(_name, block.timestamp));
        Campaign storage newCampaign = campaigns[campaignId];
        newCampaign.name = _name;
        newCampaign.startTime = block.timestamp;
        newCampaign.duration = _duration;
        newCampaign.goal = _goal;
        newCampaign.nftAddress = _nftAddress;
        newCampaign.isActive = true;
        campaignIds.push(campaignId);
        profileCampaigns[msg.sender].push(campaignId);

        emit CampaignCreated(campaignId, _name, _duration, _goal, _nftAddress);
        return campaignId;
    }

   function investInCampaign(bytes32 _campaignId, uint256 _amount) external {
    Campaign storage campaign = campaigns[_campaignId];
    require(campaign.startTime != 0, "Campaign does not exist");
    require(campaign.isActive, "Campaign is not active");
    require(block.timestamp < campaign.startTime + campaign.duration, "Campaign has ended");
    require(_amount > 0, "Investment amount must be greater than 0");

        IERC20 token = IERC20(campaign.nftAddress);
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        campaign.totalInvested += _amount;
        campaign.investments[msg.sender] += _amount;
        if (campaign.investments[msg.sender] == _amount) {
            campaign.investors.push(msg.sender);
        }

        uint256 nftId = campaign.investors.length;
        IERC721(campaign.nftAddress).mint(msg.sender, nftId);

        emit CampaignInvestment(_campaignId, msg.sender, _amount);
    }

    function endCampaign(bytes32 _campaignId) external onlyOwner {
    Campaign storage campaign = campaigns[_campaignId];
    require(campaign.startTime != 0, "Campaign does not exist");
    require(campaign.isActive, "Campaign is not active");
    require(block.timestamp >= campaign.startTime + campaign.duration, "Campaign has not ended yet");

        campaign.isActive = false;
        bool successful = campaign.totalInvested >= campaign.goal;

        if (successful) {
            // Transfer funds to the campaign owner
            IERC20(campaign.nftAddress).transfer(owner, campaign.totalInvested);
        } else {
            // Refund investors
            for (uint256 i = 0; i < campaign.investors.length; i++) {
                address investor = campaign.investors[i];
                uint256 amount = campaign.investments[investor];
                IERC20(campaign.nftAddress).transfer(investor, amount);
            }
        }

        emit CampaignEnded(_campaignId, successful);
    }

    function getCampaignDetails(bytes32 _campaignId) external view returns (string memory name, uint256 duration, uint256 goal, address nftAddress, bool isActive) {
    Campaign storage campaign = campaigns[_campaignId];
    require(campaign.startTime != 0, "Campaign does not exist");
    return (campaign.name, campaign.duration, campaign.goal, campaign.nftAddress, campaign.isActive);
}

    function getInvestorDetails(bytes32 _campaignId, address _investor) external view returns (uint256 invested, uint256 nftId) {
    Campaign storage campaign = campaigns[_campaignId];
    require(campaign.startTime != 0, "Campaign does not exist");
    
    invested = campaign.investments[_investor];
    for (uint256 i = 0; i < campaign.investors.length; i++) {
        if (campaign.investors[i] == _investor) {
            nftId = i + 1;
            break;
        }
    }
}

    function getProfileCampaigns(address _profile) external view returns (bytes32[] memory, bool[] memory) {
        bytes32[] memory userCampaigns = profileCampaigns[_profile];
        bool[] memory campaignStatus = new bool[](userCampaigns.length);

        for (uint256 i = 0; i < userCampaigns.length; i++) {
            campaignStatus[i] = campaigns[userCampaigns[i]].isActive;
        }

        return (userCampaigns, campaignStatus);
    }
}

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function mint(address to, uint256 tokenId) external;
}
