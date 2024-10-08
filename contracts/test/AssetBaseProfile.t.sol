// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {AgroBaseProfile} from "../src/AgroBaseProfileNFT.sol";


contract AgroBaseProfileTest is Test {
    AgroBaseProfile private profile;
    address private owner = address(1);  // Initial owner of the contract
    address private user = address(2);   // Another user

    function setUp() public {
        // Deploy the AgroBaseProfile contract with an initial owner
        vm.prank(owner);
        profile = new AgroBaseProfile(owner, "AgroBaseProfile", "ABP");
        assertEq(profile.owner(), owner);
        vm.stopPrank();
    }

    function testInitialMinting() public {
        // Ensure that the initial owner received a token during deployment
        assertEq(profile.ownerOf(0), owner);
        assertEq(profile.balanceOf(owner), 1);
    }

    function testSafeMint() public {
        // Prank the owner to mint a new token to the user
        vm.prank(owner);
        vm.expectRevert("Can't Mint More than 1 NFT");
        profile.safeMint(owner);
        
        // Check that the user received the token and the tokenId is 1 (next after the initial mint)
        assertEq(profile.ownerOf(0), owner);
        assertEq(profile.balanceOf(owner), 1);
        vm.stopPrank();
    }

    function testNonOwnerCannotMint() public {
        // Non-owner tries to mint a token - should revert
        vm.prank(user);
        vm.expectRevert();
        profile.safeMint(user);
        assertEq(profile.balanceOf(user), 0);
        vm.stopPrank();
    }

    function testOwnerCannotTransferToken() public {
        // Attempt to transfer the token, expect revert due to non-transferability
        vm.expectRevert();
        vm.prank(owner);
        profile.transferFrom(owner, user, 0);
        assertEq(profile.balanceOf(owner), 1);
        assertEq(profile.balanceOf(user), 0);
    }

    function testOwnerCannotSafeTransferToken() public {
        // Attempt to safeTransferFrom the token, expect revert due to non-transferability
        vm.prank(owner);
        vm.expectRevert();
        profile.safeTransferFrom(owner, user, 0);
        assertEq(profile.balanceOf(owner), 1);
        assertEq(profile.balanceOf(user), 0);
    }
}
