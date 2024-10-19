// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AgroMarketPlaceFactory {
    mapping(address => address) public agroMarketPlaceInstances;
    address[] public allMarketPlaces;

    event MarketPlaceCreated(
        address indexed owner,
        address indexed agroMarketPlaceAddress
    );

    function createMarketPlaceInstance(address owner) public {
        AgroMarketPlace newAgroMarketPlace = new AgroMarketPlace(
            payable(owner)
        );
        agroMarketPlaceInstances[owner] = address(newAgroMarketPlace);
        allMarketPlaces.push(address(newAgroMarketPlace));
        emit MarketPlaceCreated(owner, address(newAgroMarketPlace));
    }

    function getMarketPlace(address owner) public view returns (address) {
        return agroMarketPlaceInstances[owner];
    }

    function fetchAllMarketItems()
        public
        view
        returns (AgroMarketPlace.MarketPlaceItem[] memory)
    {
        uint256 totalItemsFetched = 0;
        uint256 totalItems = 0;
        uint256 maxItemsPerMarketplace = 10;

        // Calculate total items
        for (uint256 i = 0; i < allMarketPlaces.length; i++) {
            AgroMarketPlace marketplace = AgroMarketPlace(
                payable(allMarketPlaces[i])
            );
            uint256 marketPlaceItemCount = marketplace
                .fetchMarketItems()
                .length;
            totalItems += (marketPlaceItemCount > maxItemsPerMarketplace)
                ? maxItemsPerMarketplace
                : marketPlaceItemCount;
        }

        AgroMarketPlace.MarketPlaceItem[]
            memory allItems = new AgroMarketPlace.MarketPlaceItem[](totalItems);

        for (uint256 i = 0; i < allMarketPlaces.length; i++) {
            AgroMarketPlace marketplace = AgroMarketPlace(
                payable(allMarketPlaces[i])
            );
            AgroMarketPlace.MarketPlaceItem[] memory fetchedItems = marketplace
                .fetchMarketItems();
            uint256 itemsToFecth = (fetchedItems.length >
                maxItemsPerMarketplace)
                ? maxItemsPerMarketplace
                : fetchedItems.length;

            for (uint256 j; j < fetchedItems.length; j++) {
                allItems[totalItemsFetched] = fetchedItems[j];
                totalItemsFetched++;
            }
        }

        return allItems;
    }

    receive() external payable {}
}

contract AgroMarketPlace is ERC721URIStorage, ReentrancyGuard {
    uint256 private _tokenIds;
    uint256 private _itemIds;
    uint256 private _itemsSold;

    struct MarketPlaceItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        string name;
        uint256 price;
        bool isForSale;
        bool sold;
    }

    address payable public owner;

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
        bool isForSale,
        bool sold
    );

    event MarketPlaceItemSold(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        string name,
        address seller,
        uint256 price,
        bool isForSale,
        bool sold
    );

    constructor(address payable _owner) ERC721("AgroNFT", "ANFT") {
        owner = _owner;
    }

    // Listing a marketlace item
    function listItemForSale(
        string memory name,
        uint256 price,
        string memory tokenURI
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");

        _itemIds++;
        uint256 itemId = _itemIds;

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        idToMarketPlaceItem[itemId] = MarketPlaceItem(
            itemId,
            address(this),
            newTokenId,
            payable(msg.sender),
            name,
            price,
            true,
            false
        );

        _transfer(msg.sender, address(this), newTokenId);

        emit MarketPlaceItemCreated(
            itemId,
            address(this),
            newTokenId,
            name,
            msg.sender,
            price,
            true,
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

        _transfer(address(this), msg.sender, item.tokenId);

        item.sold = true;

        _itemsSold++;

        emit MarketPlaceItemSold(
            itemId,
            item.nftContract,
            item.tokenId,
            item.name,
            item.seller,
            item.price,
            true,
            true
        );
    }

    function fetchItemsNotForSale()
        public
        view
        returns (MarketPlaceItem[] memory)
    {
        uint256 itemCount = _itemIds;
        uint256 unsoldItemsCount = _itemIds - _itemsSold;
        uint256 currentIndex = 0;

        MarketPlaceItem[] memory items = new MarketPlaceItem[](
            unsoldItemsCount
        );

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketPlaceItem[i + 1].isForSale == false) {
                uint256 currentId = idToMarketPlaceItem[i + 1].itemId;
                MarketPlaceItem storage currentItem = idToMarketPlaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    // Querying the marketplace items
    function fetchMarketItems() public view returns (MarketPlaceItem[] memory) {
        uint256 itemCount = _itemIds;
        uint256 unsoldItemsCount = _itemIds - _itemsSold;
        uint256 currentIndex = 0;

        MarketPlaceItem[] memory items = new MarketPlaceItem[](
            unsoldItemsCount
        );

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketPlaceItem[i + 1].isForSale == true) {
                uint256 currentId = idToMarketPlaceItem[i + 1].itemId;
                MarketPlaceItem storage currentItem = idToMarketPlaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    receive() external payable {}
}
