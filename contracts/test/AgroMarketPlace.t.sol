// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "../src/AgroMarketPlace.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./MockNFT.sol";

contract AgroMarketPlaceTest is Test {
    AgroMarketPlaceFactory agroMarketPlaceFactory;
    AgroMarketPlace agroMarketPlace;
    MockNFT nft;

    address owner;
    address seller;
    address buyer;

    function setUp() public {
        owner = address(this);
        seller = address(0xBEEF);
        buyer = address(0xCAFE);

        // Deploy the factory
        agroMarketPlaceFactory = new AgroMarketPlaceFactory();

        // Create a  new marketplace insatnce
        agroMarketPlaceFactory.createMarketPlaceInstance(seller);

        // Get the deployed instance's address using the mapping

        address agroMarketPlaceAddress = agroMarketPlaceFactory.getMarketPlace(
            seller
        );

        // Cast address to an AgroMarketPlace insatnce
        agroMarketPlace = AgroMarketPlace(payable(agroMarketPlaceAddress));

        nft = new MockNFT();

        // Mint an NFT to the seller
        nft.mint(seller, 1);
    }

    function testListItemForSale() public {
        vm.prank(seller);
        nft.approve(address(agroMarketPlace), 1);
        vm.prank(seller);
        agroMarketPlace.listItemForSale(
            address(nft),
            1,
            1 ether,
            "Green Apple"
        );
    }

    function testPurchaseItem() public {
        testListItemForSale();

        // purcahse item
        vm.deal(buyer, 1 ether);
        vm.prank(buyer);
        agroMarketPlace.purchaseItem{value: 1 ether}(1);

        (, , , , , , , bool sold) = agroMarketPlace.idToMarketPlaceItem(1);
        assertTrue(sold);
    }

    // Test passes because foundry passes a failed test prefixed with `testFail`
    function testFailPurchaseItemWithoutEnoughFunds() public {
        testListItemForSale();

        // Buyer tries to purchase the item with insufficient funds
        vm.deal(buyer, .5 ether);
        vm.prank(buyer);
        agroMarketPlace.purchaseItem{value: 0.5 ether}(1);
    }

    // Test passes because foundry passes a failed test prefixed with `testFail`
    function testFailSellerCannotBuyOwnItem() public {
        testListItemForSale();

        vm.prank(seller);
        agroMarketPlace.purchaseItem{value: 1 ether}(1);
    }

    function testFetchMarketItems() public {
        testListItemForSale();
        AgroMarketPlace.MarketPlaceItem[] memory items = agroMarketPlace
            .fetchMarketItems();

        assertEq(items.length, 1);
        assertEq(items[0].name, "Green Apple");
        assertEq(items[0].sold, false);
    }

    function testFetchAllMarketPlaceItems() public {
        testListItemForSale();
        AgroMarketPlace.MarketPlaceItem[] memory items = agroMarketPlaceFactory.fetchAllMarketItems();

        assertEq(items.length, 1);
        assertEq(items[0].name, "Green Apple");
        assertEq(items[0].sold, false);
    }
    
    receive() external payable {}
}
