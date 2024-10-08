// File: src/CampaignFactory.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Campaign.sol";

contract CampaignFactory {
    address public owner;
    bytes32[] public campaignIds;
    mapping(bytes32 => address) public campaigns;
    mapping(address => bytes32[]) public profileCampaigns;

    // Struct to store full campaign information
    struct CampaignInfo {
        bytes32 campaignId;
        address campaignAddress;
        string name;
        uint256 duration;
        uint256 goal;
        address tokenAddress;
        address nftAddress;
    }

    // Mapping to store campaign info by ID
    mapping(bytes32 => CampaignInfo) public campaignInfo;

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
        uint256 _totalNfts,
        address _tokenAddress,
        address _nftAddress
    ) external onlyOwner returns (bytes32) {
        bytes32 campaignId = keccak256(abi.encodePacked(_name, block.timestamp));
        Campaign newCampaign = new Campaign(
            _name, 
            _duration, 
            _goal, 
            _totalNfts,
            _tokenAddress, 
            _nftAddress,
            msg.sender
        );
        campaigns[campaignId] = address(newCampaign);
        campaignIds.push(campaignId);
        
        // Store the campaign info in the new mapping
        campaignInfo[campaignId] = CampaignInfo({
            campaignId: campaignId,
            campaignAddress: address(newCampaign),
            name: _name,
            duration: _duration,
            goal: _goal,
            tokenAddress: _tokenAddress,
            nftAddress: _nftAddress
        });

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

    // Function to return detailed campaign information by campaign ID
    function getCampaignInfo(bytes32 _id) public view returns (CampaignInfo memory) {
        require(campaigns[_id] != address(0), "Campaign does not exist");
        return campaignInfo[_id];
    }

    // Function to return detailed information of all campaigns
    function getAllCampaignsInfo() public view returns (CampaignInfo[] memory) {
        CampaignInfo[] memory allCampaigns = new CampaignInfo[](campaignIds.length);
        for (uint256 i = 0; i < campaignIds.length; i++) {
            allCampaigns[i] = campaignInfo[campaignIds[i]];
        }
        return allCampaigns;
    }

    receive() external payable {}

}
