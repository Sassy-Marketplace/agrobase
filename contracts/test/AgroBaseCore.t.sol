// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AgroBaseCore.sol";
import {AgroBaseProfile} from  "../src/AgroBaseProfileNFT.sol";
import "../src/interfaces/IERC6551Registry.sol";
import {IAccountProxy} from "../src/interfaces/IImplementation.sol";

contract AgroBaseCoreTest is Test {
    AgroBaseCore public agroBaseCore;
    IERC6551Registry public mockRegistry;
    IAccountProxy public mockAccountProxy;

    address public businessOwner = address(0x1234);
    address public investor = address(0x5678);

    function setUp() public {
        string memory url = vm.rpcUrl("base");
        uint forkId = vm.createFork(url);
        vm.selectFork(forkId);
        // Deploy mocks and real contracts
        mockRegistry = IERC6551Registry(0x000000006551c19487814612e58FE06813775758);
        mockAccountProxy = IAccountProxy(0x55266d75D1a14E4572138116aF39863Ed6596E7F);

        // Deploy the AgroBaseCore contract with the mocks
        agroBaseCore = new AgroBaseCore(address(mockRegistry), address(mockAccountProxy));
    }

    function testOnboardBusiness() public {
        // Impersonate the business owner to test `onboardBusiness`
        vm.startPrank(businessOwner);
        // Call onboardBusiness with test data
        string memory name = "Test Business";
        string memory description = "Farm for Testing";
        string memory farmLocation = "Test Location";
        string memory symbol = "TST";
        
        (, address marketPlace, ) = agroBaseCore.onboardBusiness(businessOwner, name, description, farmLocation, symbol);
        // Check if the business is correctly flagged
        assertTrue(agroBaseCore.isBusiness(businessOwner), "Business should be marked onboarded");
        
        // Check if the marketplace instance was created
        (string memory businessName, , , ,address _businessOwner , address marketplaceAddress, , uint16 profileID) = agroBaseCore.allBusinessProfiles(1);

        assertEq(marketplaceAddress, marketPlace, "Marketplace should match");
        
        // Verify the business details
        assertEq(businessName, name, "Business name should match");
        assertEq(_businessOwner, businessOwner, "Business owner should match");
        assertEq(profileID, 1);

        vm.stopPrank();
    }
    
    function testCannotOnboardBusinessTwice() public {
        // Impersonate the business owner and onboard once
        vm.startPrank(businessOwner);
        agroBaseCore.onboardBusiness(businessOwner, "Test Business", "Farm", "Location", "TST");
        
        // Try onboarding again and expect it to fail
        vm.expectRevert("Can't onboard the same business twice");
        agroBaseCore.onboardBusiness(businessOwner, "Test Business", "Farm", "Location", "TST");
        
        vm.stopPrank();
    }
    
    // Test onboarding multiple users (businesses)
    function testOnboardMultipleBusinesses() public {
        address secondBusinessOwner = address(0x4321);
        address thirdBusinessOwner = address(0x8765);
        
        // Onboard multiple businesses
        vm.startPrank(businessOwner);
        agroBaseCore.onboardBusiness(businessOwner, "Business 1", "Description 1", "Location 1", "B1");
        vm.stopPrank();
        
        vm.startPrank(secondBusinessOwner);
        agroBaseCore.onboardBusiness(secondBusinessOwner, "Business 2", "Description 2", "Location 2", "B2");
        vm.stopPrank();
        
        vm.startPrank(thirdBusinessOwner);
        agroBaseCore.onboardBusiness(thirdBusinessOwner, "Business 3", "Description 3", "Location 3", "B3");
        vm.stopPrank();
        
        // Verify that all businesses are onboarded
        assertTrue(agroBaseCore.isBusiness(businessOwner), "First business should be onboarded");
        assertTrue(agroBaseCore.isBusiness(secondBusinessOwner), "Second business should be onboarded");
        assertTrue(agroBaseCore.isBusiness(thirdBusinessOwner), "Third business should be onboarded");

        // Fetch profiles
        (string memory businessName1, , , , , , , ) = agroBaseCore.allBusinessProfiles(1);
        (string memory businessName2, , , , , , , ) = agroBaseCore.allBusinessProfiles(2);
        (string memory businessName3, , , , , , , ) = agroBaseCore.allBusinessProfiles(3);

        // Assert the details of all businesses
        assertEq(businessName1, "Business 1", "First business name should match");
        assertEq(businessName2, "Business 2", "Second business name should match");
        assertEq(businessName3, "Business 3", "Third business name should match");
    }

     // Test onboarding an investor
    function testOnboardInvestor() public {
        vm.startPrank(investor);
        
        // Call onboardInvestor with test data
        string memory name = "Test Investor";
        string memory description = "Investor for Testing";
        string memory location = "Test City";
        string memory symbol = "INV";
        
        (address agroBaseProfile, address profile) = agroBaseCore.onboardInvestor(investor, name, description, location, symbol);
        
        // Check if the investor is correctly flagged
        assertTrue(agroBaseCore.isInvestor(investor), "Investor should be marked onboarded");
        
        // Check if the investor details are stored
        (string memory investorName, , , , ,address profileAddress, uint16 profileID) = agroBaseCore.allInvestorProfiles(1);
        assertEq(investorName, name, "Investor name should match");
        assertEq(profileAddress, profile, "Profile address should match");
        assertEq(profileID, 1);

        vm.stopPrank();
    }

    // Test that an investor can't register the same account twice
    function testInvestorCannotRegisterTwice() public {
        vm.startPrank(investor);
        agroBaseCore.onboardInvestor(investor, "Investor 1", "Description 1", "Location 1", "I1");
        
        // Try registering the same investor again and expect revert
        vm.expectRevert("Profile Already Exists");
        agroBaseCore.onboardInvestor(investor, "Investor 1", "Description 1", "Location 1", "I1");
        
        vm.stopPrank();
    }

     // Test onboarding multiple users (investors)
    function testOnboardMultipleInvestors() public {
        address secondInvestor = address(0x9876);
        address thirdInvestor = address(0x5432);
        
        // Onboard multiple investors
        vm.startPrank(investor);
        agroBaseCore.onboardInvestor(investor, "Investor 1", "Description 1", "Location 1", "I1");
        vm.stopPrank();
        
        vm.startPrank(secondInvestor);
        agroBaseCore.onboardInvestor(secondInvestor, "Investor 2", "Description 2", "Location 2", "I2");
        vm.stopPrank();
        
        vm.startPrank(thirdInvestor);
        agroBaseCore.onboardInvestor(thirdInvestor, "Investor 3", "Description 3", "Location 3", "I3");
        vm.stopPrank();
        
        // Verify that all investors are onboarded
        assertTrue(agroBaseCore.isInvestor(investor), "First investor should be onboarded");
        assertTrue(agroBaseCore.isInvestor(secondInvestor), "Second investor should be onboarded");
        assertTrue(agroBaseCore.isInvestor(thirdInvestor), "Third investor should be onboarded");

        // Fetch profiles
        (string memory investorName1, , , , , , ) = agroBaseCore.allInvestorProfiles(1);
        (string memory investorName2, , , , , , ) = agroBaseCore.allInvestorProfiles(2);
        (string memory investorName3, , , , , , ) = agroBaseCore.allInvestorProfiles(3);

        // Assert the details of all investors
        assertEq(investorName1, "Investor 1", "First investor name should match");
        assertEq(investorName2, "Investor 2", "Second investor name should match");
        assertEq(investorName3, "Investor 3", "Third investor name should match");
    }
    // Test editing a business profile
    function testEditBusinessProfile() public {
        vm.startPrank(businessOwner);
        
        // Onboard the business first
        agroBaseCore.onboardBusiness(businessOwner, "Old Name", "Old Description", "Old Location", "OLD");
        
        // Edit the business profile
        agroBaseCore.editBusinessProfile("New Name", "New Description", "New Location", "NEW", 1);
        
        // Fetch the updated profile
        (string memory updatedName, string memory updatedDescription, string memory updatedLocation, string memory updatedSymbol, , , , ) = agroBaseCore.allBusinessProfiles(1);
        
        // Assert the updated details
        assertEq(updatedName, "New Name", "Business name should be updated");
        assertEq(updatedDescription, "New Description", "Business description should be updated");
        assertEq(updatedLocation, "New Location", "Business location should be updated");
        assertEq(updatedSymbol, "NEW", "Business symbol should be updated");

        vm.stopPrank();
    }

    // Test editing an investor profile
    function testEditInvestorProfile() public {
        vm.startPrank(investor);
        
        // Onboard the investor first
        agroBaseCore.onboardInvestor(investor, "Old Name", "Old Description", "Old Location", "OLD");
        
        // Edit the investor profile
        agroBaseCore.editInvestorProfile("New Name", "New Description", "New Location", "NEW", 1);
        
        // Fetch the updated profile
        (string memory updatedName, string memory updatedDescription, string memory updatedLocation, string memory updatedSymbol, , , ) = agroBaseCore.allInvestorProfiles(1);
        
        // Assert the updated details
        assertEq(updatedName, "New Name", "Investor name should be updated");
        assertEq(updatedDescription, "New Description", "Investor description should be updated");
        assertEq(updatedLocation, "New Location", "Investor location should be updated");
        assertEq(updatedSymbol, "NEW", "Investor symbol should be updated");

        vm.stopPrank();
    }

    // Test fetching all business profiles
    function testGetAllBusinessProfiles() public {
        // Onboard multiple businesses
        address secondBusinessOwner = address(0x4321);
        vm.startPrank(businessOwner);
        agroBaseCore.onboardBusiness(businessOwner, "Business 1", "Description 1", "Location 1", "B1");
        vm.stopPrank();
        
        vm.startPrank(secondBusinessOwner);
        agroBaseCore.onboardBusiness(secondBusinessOwner, "Business 2", "Description 2", "Location 2", "B2");
        vm.stopPrank();
        
        // Fetch both profiles
        (string memory businessName1, , , , , , , ) = agroBaseCore.allBusinessProfiles(1);
        (string memory businessName2, , , , , , , ) = agroBaseCore.allBusinessProfiles(2);

        // Assert the details
        assertEq(businessName1, "Business 1", "First business name should match");
        assertEq(businessName2, "Business 2", "Second business name should match");
    }

    // Test fetching all investor profiles
    function testGetAllInvestorProfiles() public {
        // Onboard multiple investors
        address secondInvestor = address(0x8765);
        vm.startPrank(investor);
        agroBaseCore.onboardInvestor(investor, "Investor 1", "Description 1", "Location 1", "I1");
        vm.stopPrank();
        
        vm.startPrank(secondInvestor);
        agroBaseCore.onboardInvestor(secondInvestor, "Investor 2", "Description 2", "Location 2", "I2");
        vm.stopPrank();
        
        // Fetch both profiles
        (string memory investorName1, , , , , , ) = agroBaseCore.allInvestorProfiles(1);
        (string memory investorName2, , , , , , ) = agroBaseCore.allInvestorProfiles(2);

        // Assert the details
        assertEq(investorName1, "Investor 1", "First investor name should match");
        assertEq(investorName2, "Investor 2", "Second investor name should match");
    }

    // Test fetching a specific business profile by ID
    function testGetBusinessProfileById() public {
        vm.startPrank(businessOwner);
        agroBaseCore.onboardBusiness(businessOwner, "Business 1", "Description 1", "Location 1", "B1");
        vm.stopPrank();

        // Fetch the business profile by its ID (assuming ID starts at 1)
        (string memory businessName, string memory businessDescription, string memory farmLocation, string memory symbol, , , , ) = agroBaseCore.allBusinessProfiles(1);

        // Assert the profile details
        assertEq(businessName, "Business 1", "Business name should match");
        assertEq(businessDescription, "Description 1", "Business description should match");
        assertEq(farmLocation, "Location 1", "Farm location should match");
        assertEq(symbol, "B1", "Symbol should match");
    }

    // Test fetching a specific investor profile by ID
    function testGetInvestorProfileById() public {
        vm.startPrank(investor);
        agroBaseCore.onboardInvestor(investor, "Investor 1", "Description 1", "Location 1", "I1");
        vm.stopPrank();

        // Fetch the investor profile by its ID (assuming ID starts at 1)
        (string memory investorName, string memory investorDescription, string memory location, string memory symbol, , , ) = agroBaseCore.allInvestorProfiles(1);

        // Assert the profile details
        assertEq(investorName, "Investor 1", "Investor name should match");
        assertEq(investorDescription, "Description 1", "Investor description should match");
        assertEq(location, "Location 1", "Location should match");
        assertEq(symbol, "I1", "Symbol should match");
    }
}
