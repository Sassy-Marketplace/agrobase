// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IERC20.sol";
import "./IERC721.sol";

contract Campaign {
    string public name;
    uint256 public startTime;
    uint256 public duration;
    uint256 public goal;
    uint256 public totalInvested;
    address public tokenAddress;  // ERC20 token address
    address public nftAddress;    // ERC721 NFT address
    address public owner;
    bool public isActive;
    
    mapping(address => uint256) public investments;
    address[] public investors;

    event CampaignInvestment(address indexed investor, uint256 amount, uint256 nftId);
    event CampaignEnded(bool successful, uint256 totalAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(
        string memory _name,
        uint256 _duration,
        uint256 _goal,
        address _tokenAddress,
        address _nftAddress,
        address _owner
    ) {
        name = _name;
        startTime = block.timestamp;
        duration = _duration;
        goal = _goal;
        tokenAddress = _tokenAddress;
        nftAddress = _nftAddress;
        owner = _owner;
        isActive = true;
    }

    function invest(uint256 _amount) external {
        require(isActive, "Campaign is not active");
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

        // Add to investors list and mint NFT
        uint256 nftId;
        bool isNewInvestor = investments[msg.sender] == _amount;
        
        if (isNewInvestor) {
            investors.push(msg.sender);
            nftId = investors.length; // NFT ID is 1-based
            IERC721(nftAddress).mint(msg.sender, nftId);
        } else {
            // Find existing NFT ID
            for (uint256 i = 0; i < investors.length; i++) {
                if (investors[i] == msg.sender) {
                    nftId = i + 1;
                    break;
                }
            }
        }

        emit CampaignInvestment(msg.sender, _amount, nftId);
    }

    function endCampaign() external onlyOwner {
        require(isActive, "Campaign is not active");
        require(block.timestamp >= startTime + duration, "Campaign has not ended yet");

        isActive = false;
        bool successful = totalInvested >= goal;

        IERC20 token = IERC20(tokenAddress);

        if (successful) {
            // Transfer funds to the campaign owner
            require(token.transfer(owner, totalInvested), "Transfer to owner failed");
        } else {
            // Refund investors
            for (uint256 i = 0; i < investors.length; i++) {
                address investor = investors[i];
                uint256 amount = investments[investor];
                if (amount > 0) {
                    require(token.transfer(investor, amount), "Refund transfer failed");
                }
            }
        }

        emit CampaignEnded(successful, totalInvested);
    }

    function withdrawInvestment() external {
        require(!isActive, "Campaign is still active");
        require(totalInvested < goal, "Campaign was successful, cannot withdraw");
        
        uint256 investedAmount = investments[msg.sender];
        require(investedAmount > 0, "No investments found");

        investments[msg.sender] = 0;
        IERC20(tokenAddress).transfer(msg.sender, investedAmount);
    }

    function getInvestorDetails(address _investor) external view returns (uint256 invested, uint256 nftId) {
        invested = investments[_investor];
        for (uint256 i = 0; i < investors.length; i++) {
            if (investors[i] == _investor) {
                nftId = i + 1;  // NFT ID is 1-based
                break;
            }
        }
    }

    function getCampaignDetails() external view returns (
        string memory _name,
        uint256 _startTime,
        uint256 _duration,
        uint256 _goal,
        uint256 _totalInvested,
        address _tokenAddress,
        address _nftAddress,
        bool _isActive
    ) {
        return (
            name,
            startTime,
            duration,
            goal,
            totalInvested,
            tokenAddress,
            nftAddress,
            isActive
        );
    }

    function getInvestorsCount() external view returns (uint256) {
        return investors.length;
    }
}