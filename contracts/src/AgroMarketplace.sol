// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract AgroMarketPlace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    struct MarketPlaceItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        string name;
        uint256 price;
        bool sold;
    }

    address payable owner;

    mapping(uint256 => MarketPlaceItem) private idToMarketPlaceItem;

    /**
        Events
     */
    event MarketPlaceItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        string name,
        address seller,
        uint256 price,
        bool sold
    );

    // Listing a marketlace item
    function listItemForSale(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory name
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");
    }

    // Querying the marketplace items

    // Purchase the marketplace items
}
