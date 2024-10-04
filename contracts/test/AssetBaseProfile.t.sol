// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AgroBaseProfile.sol"; // Update this path to your contract's location

contract AgroBaseProfileTest is Test {
    AgroBaseProfile private profile;
    address private owner = address(1);  // Initial owner of the contract
    address private user = address(2);   // Another user

    function setUp() public {
        // Deploy the AgroBaseProfile contract with an initial owner
        profile = new AgroBaseProfile(owner, "AgroBaseProfile", "ABP");
    }

    function testInitialMinting() public {
        // Ensure that the initial owner received a token during deployment
        assertEq(profile.ownerOf(0), owner);
        assertEq(profile.balanceOf(owner), 1);
    }

    function testSafeMint() public {
        // Prank the owner to mint a new token to the user
        vm.prank(owner);
        profile.safeMint(user);
        
        // Check that the user received the token and the tokenId is 1 (next after the initial mint)
        assertEq(profile.ownerOf(1), user);
        assertEq(profile.balanceOf(user), 1);
    }

    function testNonOwnerCannotMint() public {
        // Non-owner tries to mint a token - should revert
        vm.expectRevert("Ownable: caller is not the owner");
        profile.safeMint(user);
    }

    function testNonTransferableToken() public {
        // Prank the owner to mint a new token to the user
        vm.prank(owner);
        profile.safeMint(user);

        // Attempt to transfer the token, expect revert due to non-transferability
        vm.expectRevert("This NFT is non-transferable");
        vm.prank(user);
        profile.transferFrom(user, owner, 1);
    }

    function testNonTransferableTokenWithSafeTransferFrom() public {
        // Prank the owner to mint a new token to the user
        vm.prank(owner);
        profile.safeMint(user);

        // Attempt to safeTransferFrom the token, expect revert due to non-transferability
        vm.expectRevert("This NFT is non-transferable");
        vm.prank(user);
        profile.safeTransferFrom(user, owner, 1);
    }

    function testOwnerCannotTransferToken() public {
        // Check that even the owner cannot transfer their token
        vm.expectRevert("This NFT is non-transferable");
        vm.prank(owner);
        profile.transferFrom(owner, user, 0);
    }

    function testOwnerCannotSafeTransferToken() public {
        // Attempt to safeTransferFrom the owner's token, expect revert
        vm.expectRevert("This NFT is non-transferable");
        vm.prank(owner);
        profile.safeTransferFrom(owner, user, 0);
    }
}
