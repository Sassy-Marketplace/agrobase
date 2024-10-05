// File: src/CampaignFactory.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Campaign.sol";

contract CampaignFactory {
    address public owner;
    bytes32[] public campaignIds;
    mapping(bytes32 => address) public campaigns;
    mapping(address => bytes32[]) public profileCampaigns;

   event CampaignCreated(
    bytes32 indexed campaignId,
    address campaignAddress,
    string name,
    uint256 duration,
    uint256 goal,
    address tokenAddress,
    address nftAddress
);
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

   function createCampaign(
    string memory _name, 
    uint256 _duration, 
    uint256 _goal, 
    address _tokenAddress,
    address _nftAddress
) external onlyOwner returns (bytes32) {
    bytes32 campaignId = keccak256(abi.encodePacked(_name, block.timestamp));
    Campaign newCampaign = new Campaign(
        _name, 
        _duration, 
        _goal, 
        _tokenAddress, 
        _nftAddress,
        msg.sender
    );
        campaigns[campaignId] = address(newCampaign);
        campaignIds.push(campaignId);
        profileCampaigns[msg.sender].push(campaignId);

         emit CampaignCreated(
        campaignId, 
        address(newCampaign), 
        _name, 
        _duration, 
        _goal, 
        _tokenAddress,
        _nftAddress
    );
        return campaignId;
    }

    function getAllCampaigns() external view returns (address[] memory) {
        address[] memory campaignAddresses = new address[](campaignIds.length);
        for (uint256 i = 0; i < campaignIds.length; i++) {
            campaignAddresses[i] = campaigns[campaignIds[i]];
        }
        return campaignAddresses;
    }

    function getProfileCampaigns(address _profile) external view returns (bytes32[] memory) {
        return profileCampaigns[_profile];
    }
}
