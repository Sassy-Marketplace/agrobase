// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgroBaseProfile is ERC721, Ownable {
    uint256 private _nextTokenId;
    constructor(address business, string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
        Ownable(business)
    {   _nextTokenId = 0;
        safeMint(business);
    }

    function safeMint(address user) public {
        require(_nextTokenId < 1, "Can't Mint More than 1 NFT");
        uint256 tokenId = _nextTokenId++;
        _safeMint(user, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner {
        require(from == address(0) || to == address(0), "Can't Transfer");
    }

}