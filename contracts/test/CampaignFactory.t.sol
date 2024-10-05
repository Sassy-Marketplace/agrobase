// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/CampaignFactory.sol";
import "../src/IERC20.sol";
import "../src/IERC721.sol";

contract MockERC20 is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;

    function mint(address to, uint256 amount) public {
        _balances[to] += amount;
        _totalSupply += amount;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(_allowances[from][msg.sender] >= amount, "Insufficient allowance");
        require(_balances[from] >= amount, "Insufficient balance");
        _allowances[from][msg.sender] -= amount;
        _balances[from] -= amount;
        _balances[to] += amount;
        return true;
    }
}

contract MockERC721 is IERC721 {
    mapping(uint256 => address) private _owners;
    
    function mint(address to, uint256 tokenId) external {
        _owners[tokenId] = to;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        owner = _owners[tokenId];
        require(owner != address(0), "Token doesn't exist");
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        require(_owners[tokenId] == from, "Not the owner");
        _owners[tokenId] = to;
    }
}

contract TestCampaignFactory is Test {
    CampaignFactory factory;
    MockERC20 token;
    MockERC721 nftToken;
    address user;

    function setUp() public {
        factory = new CampaignFactory();
        token = new MockERC20();
        nftToken = new MockERC721();
        user = address(this);

        // Mint some tokens to the test contract
        token.mint(user, 100 ether);
    }

    function testCreateCampaign() public {
        bytes32 campaignId = factory.createCampaign(
            "Test Campaign",
            30 days,
            100 ether,
            address(token),
            address(nftToken)
        );
        address campaignAddress = factory.campaigns(campaignId);
        assertTrue(campaignAddress != address(0), "Campaign creation failed");
    }

    function testInvestInCampaign() public {
        // Create a campaign
        bytes32 campaignId = factory.createCampaign(
            "Test Campaign",
            30 days,
            100 ether,
            address(token),
            address(nftToken)
        );
        address campaignAddress = factory.campaigns(campaignId);

        // Approve the token transfer
        token.approve(campaignAddress, 10 ether);

        // Get initial balances
        uint256 initialBalance = token.balanceOf(user);

        // Invest in the campaign
        Campaign(campaignAddress).invest(10 ether);

        // Check if the investment is recorded correctly
        uint256 finalBalance = token.balanceOf(user);
        uint256 campaignBalance = token.balanceOf(campaignAddress);

        assertEq(finalBalance, initialBalance - 10 ether, "User balance not updated correctly");
        assertEq(campaignBalance, 10 ether, "Campaign didn't receive tokens");

        // Check investor details
        (uint256 invested, uint256 nftId) = Campaign(campaignAddress).getInvestorDetails(user);
        assertEq(invested, 10 ether, "Invested amount not recorded correctly");
        assertEq(nftId, 1, "Incorrect NFT ID");
    }

    function testGetAllCampaigns() public {
        factory.createCampaign("Test Campaign 1", 30 days, 100 ether, address(token), address(nftToken));
        factory.createCampaign("Test Campaign 2", 30 days, 200 ether, address(token), address(nftToken));

        address[] memory campaigns = factory.getAllCampaigns();
        assertEq(campaigns.length, 2, "Campaign count mismatch");
    }

    function testEndCampaign() public {
        bytes32 campaignId = factory.createCampaign("Test Campaign", 30 days, 100 ether, address(token), address(nftToken));
        address campaignAddress = factory.campaigns(campaignId);

        Campaign campaign = Campaign(campaignAddress);
        vm.warp(block.timestamp + 31 days);
        campaign.endCampaign();
        assertTrue(!campaign.isActive(), "Campaign should be inactive after ending");
    }
}