// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/AgroBaseCore.sol";
import {AgroBaseProfile} from  "../src/AgroBaseProfileNFT.sol";
import "../src/interfaces/IERC6551Registry.sol";
import {IAccountProxy} from "../src/interfaces/IImplementation.sol";
import "../src/CampaignFactory.sol";
import {AgroMarketPlace, AgroMarketPlaceFactory} from "../src/AgroMarketPlace.sol";
contract CounterScript is Script {

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        AgroBaseCore core = new AgroBaseCore(0x000000006551c19487814612e58FE06813775758, 0x55266d75D1a14E4572138116aF39863Ed6596E7F);
        AgroMarketPlaceFactory market = core.marketplaceFactory();
            market.createMarketPlaceInstance(payable(0x04f6431098126Ded648f3C5589E2EF3beac09E15));
        // CampaignFactory campaign = core.campaignFactory();
        // campaign.createCampaign("test", 30, 1000, 100, 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, 0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a);
        // core.campaignFactory();
        vm.stopBroadcast();
    }
}
