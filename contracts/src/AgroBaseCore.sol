// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AgroBaseProfileNFT.sol";
import "./CampaignFactory.sol";
import "./MarketplaceFactory.sol";
import "./AssetFactory.sol";
import "./interfaces/IERC6551Registry.sol";
import "./interfaces/IImplementation.sol";

contract AgroBaseCore {
    address public owner;
    AgroBaseProfile public agroBaseProfile;
    AssetFactory public assetFactory;
    IERC6551Registry public iRegistry;
    IImplementation public iAccountProxy;
    CampaignFactory public campaignFactory;
    MarketplaceFactory public marketplaceFactory;

    mapping(address => bool) public isFarmer;
    mapping(address => bool) public isInvestor;
    mapping(address => bool) public isBusiness;

    event FarmerOnboarded(address indexed farmer);
    event InvestorOnboarded(address indexed investor);
    event BusinessOnboarded(address indexed business);

    constructor(address _campaignFactory, address _agroBaseProfileNft, address _assetFactory, address _marketplaceFactory) {
        assetFactory = new AssetFactory(_assetFactory);
        campaignFactory = new CampaignFactory(_campaignFactory);
        marketplaceFactory = new MarketplaceFactory(_marketplaceFactory);
    }

    // Onboard Farmers and Automatically Create Marketplace
    function onboardFarmer(address farmer, address _iRegistry, address _accountProxy,  string memory name, string memory farmLocation, string memory _symbol) public returns(address _profile, address _marketPlace, address _campaign, address _agroBaseProfile) {
        AgroBaseProfile _agroBaseProfileNft = new AgroBaseProfile(farmer, name, _symbol);
        _agroBaseProfile = address(_agroBaseProfileNft)
        _iRegistry.createAccount(_accountProxy, "", 8435, _agroBaseProfile, 1);
        marketplaceFactory.createMarketplace(farmer);
        isFarmer[farmer] = true;
        tokenBoundAccount.createAccount(farmer);
        onchainIdentity.createIdentity(farmer, name, farmLocation);
        emit FarmerOnboarded(farmer);
    }

    // Onboard Investors
    function onboardInvestor(address investor) public {
        require(msg.sender == owner, "Only owner can onboard investors");
        isInvestor[investor] = true;
        tokenBoundAccount.createAccount(investor);
        emit InvestorOnboarded(investor);
    }

    // Onboard Businesses
    function onboardBusiness(address business) public {
        require(msg.sender == owner, "Only owner can onboard businesses");
        isBusiness[business] = true;
        tokenBoundAccount.createAccount(business);
        emit BusinessOnboarded(business);
    }
}
