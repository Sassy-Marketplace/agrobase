// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgroBaseProfile is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner, string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
        Ownable(initialOwner)
    { safeMint(initialOwner);}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

        // Override transfer functions to prevent transfer
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal pure {
        require(from == address(0) || to == address(0), "This NFT is non-transferable");
    }
}