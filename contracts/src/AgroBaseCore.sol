// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AgroBaseProfile} from "./AgroBaseProfileNFT.sol";
import "./CampaignFactory.sol";
import "./MarketplaceFactory.sol";
import "./AssetFactory.sol";
import "./interfaces/IERC6551Registry.sol";
import "./interfaces/IImplementation.sol";

contract AgroBaseCore {
    IERC6551Registry public iRegistry;
    IImplementation public iAccountProxy;
    CampaignFactory public campaignFactory;
    MarketplaceFactory public marketplaceFactory;
    uint16 businessIds;
    uint16 userIds;

    struct BusinessProfileDetails{
        string businessName;
        string businessDescription;
        string businessLocation;
        string businessSymbol;
        address businessOwner;
        address store;
        address tokenboundAddr;
        address campaignStore;
        uint16 profileID;
    }

    mapping(address => bool) public isBusiness;
    mapping(address => bool) public isInvestor;
    mapping(uint16 => BusinessProfileDetails) public allBusinessProfiles;

    event InvestorOnboarded(address indexed investor);
    event BusinessOnboarded(address indexed business);

    constructor(address _campaignFactory, address _marketplaceFactory) {
        campaignFactory = new CampaignFactory(_campaignFactory);
        marketplaceFactory = new MarketplaceFactory(_marketplaceFactory);
        businessIds = 0;
        userIds = 0;
    }

    // Onboard AgroBusiness and Automatically Create Marketplace and Campaign
    function onboardBusiness(address _iRegistry, address _accountProxy,  string memory name, string memory description, string memory farmLocation, string memory _symbol) public returns(address _profile, address _marketPlace, address _campaign, address _agroBaseProfile) {
        const business = msg.sender;
        AgroBaseProfile _agroBaseProfileNft = new AgroBaseProfile(business, name, _symbol);
        _agroBaseProfile = address(_agroBaseProfileNft)
       let tokenbound = _iRegistry.createAccount(_accountProxy, "", 8435, _agroBaseProfile, 1);
       _profile = address(tokenbound);
        let market = marketplaceFactory.createMarketplace(business);
        let campaign = campaignFactory.createAccount(business);
        businessIds += 1;
        BusinessProfileDetails profileDetails = BusinessProfileDetails(name,description,farmLocation,_symbol,msg.sender,market,_profile, campaign, businessIds);
        allBusinessProfiles[businessIds] = profileDetails;
        isBusiness[business] = true;
        emit BusinessOnboarded(business);
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
