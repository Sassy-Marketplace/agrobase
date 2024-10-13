// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/AgroBaseCore.sol";
import {AgroBaseProfile} from  "../src/AgroBaseProfileNFT.sol";
import "../src/interfaces/IERC6551Registry.sol";
import {IAccountProxy} from "../src/interfaces/IImplementation.sol";
import "../src/CampaignFactory.sol";
import {AgroMarketPlace} from "../src/AgroMarketPlace.sol";
contract CounterScript is Script {

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        AgroMarketPlace marketplace = new AgroMarketPlace(payable(0x04f6431098126Ded648f3C5589E2EF3beac09E15));
        marketplace.owner();
        CampaignFactory campaign = new CampaignFactory();
        campaign.createCampaign("FEMA", 30, 1000, 1000, 0xE4aB69C077896252FAFBD49EFD26B5D171A32410, 0x4065400b4A4FEaE400aaa0e712E3d0e9F1AfeC87);
        vm.stopBroadcast();
    }
}
