// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AgroBaseProfile} from "./AgroBaseProfileNFT.sol";
import "./CampaignFactory.sol";
import {AgroMarketPlaceFactory} from "./AgroMarketPlace.sol";
import "./interfaces/IERC6551Registry.sol";
import {IAccountProxy} from "./interfaces/IImplementation.sol";

contract AgroBaseCore {
    IERC6551Registry public iRegistry;
    IAccountProxy public iAccountProxy;
    CampaignFactory public campaignFactory;
    AgroMarketPlaceFactory public marketplaceFactory;
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
        uint16 profileID;
    }

    struct InvestorProfileDetails{
        string name;
        string description;
        string location;
        string symbol;
        address user;
        address tokenboundAddr;
        uint16 profileID;
    }

    mapping(address => bool) public isBusiness;
    mapping(address => bool) public isInvestor;
    mapping(uint16 => BusinessProfileDetails) public allBusinessProfiles;
    mapping(uint16 => InvestorProfileDetails) public allInvestorProfiles;

    event InvestorOnboarded(address indexed investor);
    event BusinessOnboarded(address indexed business);
    event BusinessProfileUpdated(address indexed business);
    event InvestorProfileUpdated(address indexed investor);

 constructor(address _iRegistry, address _accountProxy) {
        iRegistry = IERC6551Registry(_iRegistry);
        iAccountProxy = IAccountProxy(_accountProxy);
        marketplaceFactory = new AgroMarketPlaceFactory();
        businessIds = 0;
        userIds = 0;
    }

    // Onboard Business/AgroBusiness/Farmers and Automatically Create Marketplace
    function onboardBusiness(address business,string memory name, string memory description, string memory farmLocation, string memory _symbol) public returns(address _profile, address _marketPlace, address _agroBaseProfile) {
        require(business == msg.sender, "Not Authorized");
        require(isBusiness[business] == false, "Can't onboard the same business twice");
        AgroBaseProfile _agroBaseProfileNft = new AgroBaseProfile(business, name, _symbol);
        _agroBaseProfile = address(_agroBaseProfileNft);
        _profile = iRegistry.createAccount(address(iAccountProxy), "0x0f", 8453, _agroBaseProfile, 1);
        marketplaceFactory.createMarketPlaceInstance(business);
        _marketPlace = marketplaceFactory.getMarketPlace(business);
        businessIds += 1;
        BusinessProfileDetails memory profileDetails = BusinessProfileDetails(name, description, farmLocation, _symbol, msg.sender, _marketPlace, _profile, businessIds);
        allBusinessProfiles[businessIds] = profileDetails;
        isBusiness[business] = true;
        emit BusinessOnboarded(business);
    }

    // Onboard Investors
    function onboardInvestor(address investor, string memory _name, string memory _description, string memory _location, string memory _symbol) public returns(address _agroBaseProfile, address _profile) {
        require(msg.sender == investor, "Only owner can Authorize");
        require(isInvestor[investor] == false, "Profile Already Exists");

        AgroBaseProfile _agroBaseProfileNft = new AgroBaseProfile(investor, _name, _symbol);
        _agroBaseProfile = address(_agroBaseProfileNft);
        _profile = iRegistry.createAccount(address(iAccountProxy), "0x0f", 8453, _agroBaseProfile, 1);
        userIds += 1;
        InvestorProfileDetails memory investorDetails = InvestorProfileDetails(_name, _description, _location, _symbol, investor, _profile, userIds);
        allInvestorProfiles[userIds] = investorDetails;
        isInvestor[investor] = true;
        emit InvestorOnboarded(investor);
    }

      // Edit Business Profile Information
    function editBusinessProfile(
        string memory _name, 
        string memory _description, 
        string memory _location, 
        string memory _symbol,
        uint16 _profileId
    ) 
        public 
    {
        require(isBusiness[msg.sender], "Not a registered business");
        BusinessProfileDetails storage profile = allBusinessProfiles[_profileId];

        // Ensure only the business owner can edit the profile
        require(profile.businessOwner == msg.sender, "Not authorized");

        // Update profile information
        profile.businessName = _name;
        profile.businessDescription = _description;
        profile.businessLocation = _location;
        profile.businessSymbol = _symbol;

        emit BusinessProfileUpdated(msg.sender);
    }

    // Edit Investor Profile Information
    function editInvestorProfile(
        string memory _name, 
        string memory _description, 
        string memory _location, 
        string memory _symbol,
        uint16 _profileId
    ) 
        public 
    {
        require(isInvestor[msg.sender], "Not a registered investor");
        InvestorProfileDetails storage profile = allInvestorProfiles[_profileId];

        // Ensure only the investor can edit the profile
        require(profile.user == msg.sender, "Not authorized");

        // Update profile information
        profile.name = _name;
        profile.description = _description;
        profile.location = _location;
        profile.symbol = _symbol;

        emit InvestorProfileUpdated(msg.sender);
    }

    // Get all Business Profiles
    function getAllBusinessProfiles() public view returns (BusinessProfileDetails[] memory) {
        BusinessProfileDetails[] memory profiles = new BusinessProfileDetails[](businessIds);
        for (uint16 i = 1; i <= businessIds; i++) {
            profiles[i - 1] = allBusinessProfiles[i];
        }
        return profiles;
    }

    // Get all Investor Profiles
    function getAllInvestorProfiles() public view returns (InvestorProfileDetails[] memory) {
        InvestorProfileDetails[] memory profiles = new InvestorProfileDetails[](userIds);
        for (uint16 i = 1; i <= userIds; i++) {
            profiles[i - 1] = allInvestorProfiles[i];
        }
        return profiles;
    }

    // Get a specific Business Profile
    function getBusinessProfile(uint16 _profileId) public view returns (BusinessProfileDetails memory) {
        require(_profileId > 0 && _profileId <= businessIds, "Business profile not found");
        return allBusinessProfiles[_profileId];
    }

    // Get a specific Investor Profile
    function getInvestorProfile(uint16 _profileId) public view returns (InvestorProfileDetails memory) {
        require(_profileId > 0 && _profileId <= userIds, "Investor profile not found");
        return allInvestorProfiles[_profileId];
    }

}
