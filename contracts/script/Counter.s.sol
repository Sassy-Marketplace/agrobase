// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/AgroBaseCore.sol";
import {AgroBaseProfile} from  "../src/AgroBaseProfileNFT.sol";
import "../src/interfaces/IERC6551Registry.sol";
import {IAccountProxy} from "../src/interfaces/IImplementation.sol";
import "../src/CampaignFactory.sol";
import {AgroMarketPlaceFactory} from "../src/AgroMarketPlace.sol";
contract CounterScript is Script {
    AgroBaseCore public agroBaseCore;
    IERC6551Registry public mockRegistry;
    IAccountProxy public mockAccountProxy;
    AgroMarketPlaceFactory public marketplace;
    CampaignFactory public campaign;

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
    }
}
