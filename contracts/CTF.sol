// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract CTF {
    
    event LastSeed(bytes32 theLastSeed);
    
    bytes32 public lastSeed;
    uint256 wtf = 29836915074519068104088936947794877181446157905180232883246809992121215122387;
    
    function getLastSeed() external view returns (bytes32) {
        return lastSeed;
    }

    function retrieveLastWord(string memory firstLetterOfSeed10, string memory firstLetterOfSeed11) external {
        bytes32 theLastSeed = bytes32(uint256(keccak256(abi.encodePacked(firstLetterOfSeed10, firstLetterOfSeed11))) - wtf);
        lastSeed = theLastSeed;
        emit LastSeed(theLastSeed);
    }
}