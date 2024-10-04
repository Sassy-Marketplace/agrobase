
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../src/InvestmentContract.sol";
import "forge-std/Test.sol";

contract MockERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;

    function mint(address account, uint256 amount) public {
        _balances[account] += amount;
        _totalSupply += amount;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        _allowances[sender][msg.sender] -= amount;
        return true;
    }
}

contract MockERC721 {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;

    function mint(address to, uint256 tokenId) public {
        _owners[tokenId] = to;
        _balances[to] += 1;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_owners[tokenId] == from, "Not the owner");
        _owners[tokenId] = to;
        _balances[from] -= 1;
        _balances[to] += 1;
    }

    function approve(address to, uint256 tokenId) public {
        _tokenApprovals[tokenId] = to;
    }
}

contract InvestmentContractTest is Test {
    InvestmentContract public investmentContract;
    MockERC20 public mockToken;
    MockERC721 public mockNFT;
    address public owner;
    address public investor1;
    address public investor2;

    function setUp() public {
        owner = address(this);
        investor1 = address(0x1);
        investor2 = address(0x2);
        
        investmentContract = new InvestmentContract();
        mockToken = new MockERC20();
        mockNFT = new MockERC721();
    }

    function testInitialState() public view {
    assertEq(investmentContract.owner(), owner);
    assertEq(investmentContract.investmentFee(), 100);
    assertEq(investmentContract.withdrawalFee(), 200);
}

    function testAddAsset() public {
        investmentContract.addAsset(address(mockToken), false);
        bytes32 assetId = keccak256(abi.encodePacked(address(mockToken), false));
        (address tokenAddress, bool isERC721, uint256 totalShares, uint256 totalInvestment) = investmentContract.assets(assetId);
        assertEq(tokenAddress, address(mockToken));
        assertEq(isERC721, false);
        assertEq(totalShares, 0);
        assertEq(totalInvestment, 0);
    }

    function testInvest() public {
        investmentContract.addAsset(address(mockToken), false);
        bytes32 assetId = keccak256(abi.encodePacked(address(mockToken), false));
        
        mockToken.mint(investor1, 1 ether);
        vm.startPrank(investor1);
        mockToken.approve(address(investmentContract), 0.5 ether);
        investmentContract.invest(assetId, 0.5 ether);
        vm.stopPrank();

        (uint256 amount, uint256 shares, , bool active) = investmentContract.getInvestmentDetails(assetId, investor1);
        assertEq(amount, 0.495 ether); // 0.5 ether - 1% fee
        assertEq(shares, 0.495 ether * (10**18)); // initial shares
        assertEq(active, true);
    }

    function testWithdraw() public {
        investmentContract.addAsset(address(mockToken), false);
        bytes32 assetId = keccak256(abi.encodePacked(address(mockToken), false));
        
        mockToken.mint(investor1, 1 ether);
        vm.startPrank(investor1);
        mockToken.approve(address(investmentContract), 0.5 ether);
        investmentContract.invest(assetId, 0.5 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days);

        vm.prank(investor1);
        investmentContract.withdraw(assetId, 0.495 ether * (10**18));

        (uint256 amount, uint256 shares, , bool active) = investmentContract.getInvestmentDetails(assetId, investor1);
        assertEq(amount, 0);
        assertEq(shares, 0);
        assertEq(active, false);
    }

    function testCreateCampaign() public {
        bytes32 campaignId = investmentContract.createCampaign("Test Campaign", 7 days, 100 ether, address(mockToken));
        
        (string memory name, uint256 duration, uint256 goal, address nftAddress, bool isActive) = investmentContract.getCampaignDetails(campaignId);
        
        assertEq(name, "Test Campaign");
        assertEq(duration, 7 days);
        assertEq(goal, 100 ether);
        assertEq(nftAddress, address(mockToken));
        assertTrue(isActive);
    }

    function testInvestInCampaign() public {
        bytes32 campaignId = investmentContract.createCampaign("Test Campaign", 7 days, 100 ether, address(mockToken));
        
        mockToken.mint(investor1, 10 ether);
        vm.startPrank(investor1);
        mockToken.approve(address(investmentContract), 5 ether);
        investmentContract.investInCampaign(campaignId, 5 ether);
        vm.stopPrank();

        (uint256 invested, uint256 nftId) = investmentContract.getInvestorDetails(campaignId, investor1);
        assertEq(invested, 5 ether);
        assertEq(nftId, 1);
    }

    function testEndCampaign() public {
        bytes32 campaignId = investmentContract.createCampaign("Test Campaign", 7 days, 100 ether, address(mockToken));
        
        mockToken.mint(investor1, 100 ether);
        vm.startPrank(investor1);
        mockToken.approve(address(investmentContract), 100 ether);
        investmentContract.investInCampaign(campaignId, 100 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);

        investmentContract.endCampaign(campaignId);

        (, , , , bool isActive) = investmentContract.getCampaignDetails(campaignId);
        assertFalse(isActive);
    }

    function testGetProfileCampaigns() public {
        // Create multiple campaigns
        bytes32 campaignId1 = investmentContract.createCampaign("Campaign 1", 7 days, 100 ether, address(mockToken));
        bytes32 campaignId2 = investmentContract.createCampaign("Campaign 2", 14 days, 200 ether, address(mockToken));
        bytes32 campaignId3 = investmentContract.createCampaign("Campaign 3", 21 days, 300 ether, address(mockToken));

        // End one campaign
        vm.warp(block.timestamp + 8 days);
        investmentContract.endCampaign(campaignId1);

        // Get all campaigns for the owner
        (bytes32[] memory campaignIds, bool[] memory isActive) = investmentContract.getProfileCampaigns(owner);

        // Assert the results
        assertEq(campaignIds.length, 3);
        assertEq(isActive.length, 3);
        assertEq(campaignIds[0], campaignId1);
        assertEq(campaignIds[1], campaignId2);
        assertEq(campaignIds[2], campaignId3);
        assertFalse(isActive[0]);
        assertTrue(isActive[1]);
        assertTrue(isActive[2]);
    }
}





