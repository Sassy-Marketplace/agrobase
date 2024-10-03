// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract AgroMarketPlace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

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

    mapping(uint256 => MarketPlaceItem) public idToMarketPlaceItem;

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

    event MarketPlaceItemSold(
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
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Caller is not owner");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketPlaceItem[itemId] = MarketPlaceItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            name,
            price,
            false
        );

        nft.transferFrom(msg.sender, address(this), tokenId);

        emit MarketPlaceItemCreated(
            itemId,
            nftContract,
            tokenId,
            name,
            msg.sender,
            price,
            false
        );
    }

    // Todo: take into consideration the amount a user wants to purchase

    function purchaseItem(uint256 itemId) public payable nonReentrant {
        MarketPlaceItem storage item = idToMarketPlaceItem[itemId];

        require(
            msg.value >= item.price,
            "Not enough funds to purchase this product"
        );
        require(
            msg.sender != item.seller,
            "Seller cannot purchase their own product"
        );

        // Transfer Ether to the Seller

        (bool success, ) = item.seller.call{value: item.price}("");
        require(success, "Transfer to seller failed");

        IERC721(item.nftContract).transferFrom(
            address(this),
            msg.sender,
            item.tokenId
        );

        item.sold = true;

        _itemsSold.increment();

        emit MarketPlaceItemSold(
            itemId,
            item.nftContract,
            item.tokenId,
            item.name,
            item.seller,
            item.price,
            true
        );
    }

    // Querying the marketplace items
    function fetchMarketItems() public view returns (MarketPlaceItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemsCount = (_itemIds.current()) -
            (_itemsSold.current());
        uint256 currentIndex = 0;
        MarketPlaceItem[] memory items = new MarketPlaceItem[](
            unsoldItemsCount
        );

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = idToMarketPlaceItem[i + 1].itemId;
            MarketPlaceItem storage currentItem = idToMarketPlaceItem[
                currentId
            ];
            items[currentIndex] = currentItem;
            currentIndex++;
        }

        return items;
    }
}
