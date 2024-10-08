// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./interfaces/IERC20.sol";
import "./interfaces/IERC721.sol";

contract Campaign {
    string public name;
    uint256 public startTime;
    uint256 public duration;
    uint256 public goal;
    uint256 public totalInvested;
    uint256 public totalNfts;
    uint256 public nftsDistributed;
    address public tokenAddress;  // ERC20 token address
    address public nftAddress;    // ERC721 NFT address
    address public owner;
    uint16 public id;
    bool public isActive;
    bool public isPaused;
    
    mapping(address => uint256) public investments;
    mapping(address => uint256) public investorNftCount; // Track NFTs per investor
    address[] public investors;

    event CampaignInvestment(address indexed investor, uint256 amount, uint256 nftAmount);
    event CampaignEnded(bool successful, uint256 totalAmount);
    event CampaignPaused();
    event CampaignResumed();
    event CampaignExtended(uint256 newDuration);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(
        string memory _name,
        uint256 _duration,
        uint256 _goal,
        uint256 _totalNfts,
        address _tokenAddress,
        address _nftAddress,
        address _owner
    ) {
        name = _name;
        startTime = block.timestamp;
        duration = _duration;
        goal = _goal;
        totalNfts = _totalNfts;
        tokenAddress = _tokenAddress;
        nftAddress = _nftAddress;
        owner = _owner;
        isActive = true;
        isPaused = false;
    }

    function invest(uint256 _amount) external {
        require(isActive, "Campaign is not active");
        require(!isPaused, "Campaign is paused");
        require(block.timestamp < startTime + duration, "Campaign has ended");
        require(_amount > 0, "Investment amount must be greater than 0");

        IERC20 token = IERC20(tokenAddress);

        // Check allowance and balance before transferring
        require(token.allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient balance");

        // Perform the transfer
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        // Update investment tracking
        totalInvested += _amount;
        investments[msg.sender] += _amount;

        // Add to investors list if this is a new investor
        bool isNewInvestor = investments[msg.sender] == _amount;
        if (isNewInvestor) {
            investors.push(msg.sender);
        }

        // Calculate the total NFTs based on the proportion of the goal achieved
        uint256 totalNftAmount = (investments[msg.sender] * totalNfts) / goal;

        // Determine how many new NFTs to mint for the investor
        uint256 newNftAmount = totalNftAmount - investorNftCount[msg.sender];
        
        // Ensure we don't distribute more NFTs than the total
        require(nftsDistributed + newNftAmount <= totalNfts, "Not enough NFTs remaining");
        
        // Mint new NFTs based on the calculated proportion
        for (uint256 i = 0; i < newNftAmount; i++) {
            IERC721(nftAddress).mint(msg.sender, nftsDistributed + i);
        }

        // Update distributed NFT count for the investor
        investorNftCount[msg.sender] += newNftAmount;
        nftsDistributed += newNftAmount;

        emit CampaignInvestment(msg.sender, _amount, newNftAmount);
    }

    function endCampaign() external onlyOwner {
        require(isActive, "Campaign is not active");
        require(block.timestamp >= startTime + duration, "Campaign has not ended yet");

        isActive = false;

        IERC20 token = IERC20(tokenAddress);

        // Transfer all collected funds to the campaign owner, regardless of goal being met
        require(token.transfer(owner, totalInvested), "Transfer to owner failed");

        // Emit event indicating the end of the campaign, with total amount invested
        emit CampaignEnded(totalInvested >= goal, totalInvested);
    }

    function pauseCampaign() external onlyOwner {
        require(isActive, "Campaign is not active");
        require(!isPaused, "Campaign is already paused");
        isPaused = true;

        emit CampaignPaused();
    }

    function resumeCampaign() external onlyOwner {
        require(isPaused, "Campaign is not paused");
        isPaused = false;

        emit CampaignResumed();
    }

    function extendCampaign(uint256 additionalTime) external onlyOwner {
        require(isActive, "Campaign is not active");
        require(block.timestamp >= startTime + duration, "Campaign has not ended yet");

        duration += additionalTime;

        emit CampaignExtended(duration);
    }

    function getInvestorDetails(address _investor) external view returns (uint256 invested, uint256 nftAmount) {
        invested = investments[_investor];
        nftAmount = investorNftCount[_investor]; // Return total NFTs received
    }

    function getCampaignDetails() external view returns (
        string memory _name,
        uint256 _startTime,
        uint256 _duration,
        uint256 _goal,
        uint256 _totalInvested,
        uint256 _totalNfts,
        uint256 _nftsDistributed,
        address _tokenAddress,
        address _nftAddress,
        bool _isActive,
        bool _isPaused
    ) {
        return (
            name,
            startTime,
            duration,
            goal,
            totalInvested,
            totalNfts,
            nftsDistributed,
            tokenAddress,
            nftAddress,
            isActive,
            isPaused
        );
    }

    function getInvestorsCount() external view returns (uint256) {
        return investors.length;
    }
}
