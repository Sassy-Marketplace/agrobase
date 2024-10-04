// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AssetToken.sol"; // Update this path to your contract's location

contract AssetTFactoryTest is Test {
    AssetFactory private assetToken;
    address private owner = address(1);
    address private user = address(2);

    function setUp() public {
        // Deploy AssetToken with initialOwner as the owner address
        assetToken = new AssetToken(owner, "AgroAssetToken", "AAT");
    }

    function testInitialSetup() public {
        assertEq(assetToken.name(), "AgroAssetToken");
        assertEq(assetToken.symbol(), "AAT");
        assertEq(assetToken.owner(), owner);
        assertEq(assetToken.tokenCounter(), 0);
    }

    function testSafeMint() public {
        // Prank the owner to call functions as the contract owner
        vm.prank(owner);
        assetToken.safeMint(user, "ipfs://token-uri");
        
        // Check token ownership
        assertEq(assetToken.ownerOf(0), user);
        
        // Check the token URI
        assertEq(assetToken.tokenURI(0), "ipfs://token-uri");

        // Verify token counter is incremented
        assertEq(assetToken.tokenCounter(), 0);
    }

    function testSafeMintNonOwnerRevert() public {
        // Trying to mint from a non-owner address should revert
        vm.expectRevert("Ownable: caller is not the owner");
        assetToken.safeMint(user, "ipfs://token-uri");
    }

    function testSupportsInterface() public {
        // Check ERC721 interface support
        assertTrue(assetToken.supportsInterface(type(IERC721).interfaceId));
        // Check ERC721Metadata interface support
        assertTrue(assetToken.supportsInterface(type(IERC721Metadata).interfaceId));
    }

    function testMintMultipleTokens() public {
        // Prank the owner to mint multiple tokens
        vm.startPrank(owner);
        assetToken.safeMint(user, "ipfs://token-uri-1");
        assetToken.safeMint(user, "ipfs://token-uri-2");
        vm.stopPrank();

        // Verify ownership and URIs for both tokens
        assertEq(assetToken.ownerOf(0), user);
        assertEq(assetToken.tokenURI(0), "ipfs://token-uri-1");

        assertEq(assetToken.ownerOf(1), user);
        assertEq(assetToken.tokenURI(1), "ipfs://token-uri-2");

        // Verify the token counter
        assertEq(assetToken.tokenCounter(), 1); // tokenCounter should still be 1 due to `tokenCounter` definition
    }

    function testBurnToken() public {
        // Mint a token first
        vm.prank(owner);
        assetToken.safeMint(user, "ipfs://token-uri");
        
        // Check ownership
        assertEq(assetToken.ownerOf(0), user);

        // Prank user to burn their own token
        vm.prank(user);
        assetToken.burn(0);

        // Check that token no longer exists (burned)
        vm.expectRevert("ERC721: owner query for nonexistent token");
        assetToken.ownerOf(0);
    }
}
