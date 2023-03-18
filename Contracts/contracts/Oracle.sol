// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

interface IOracle {
    function getPrice(
        uint256 _price
    ) external;

    function getVRF(
        uint[] calldata _numbers
    ) external;
}

contract Oracle {
    event RequestPrice(
        address caller,
        string currencySymbol,
        uint requestTime
    );

    event RequestVRF(
        address caller,
        uint toNumber,
        uint count,
        uint requestTime
    );

    bool lock;
    modifier reentrant() {
        require(lock == false, "Locked");
        lock = true;
        _;
        lock = false;
    }

    function requestPrice(string calldata _symbol) reentrant external returns(bool status) {
        require(bytes(_symbol).length >=3, "Too short symbol");

        emit RequestPrice({
            caller: msg.sender,
            currencySymbol: _symbol,
            requestTime: block.timestamp
        });

        status = true;
    }

    function requestVRF(
        uint _toNumber, /// Note: 0 To _toNumber
        uint _count
    ) reentrant external returns(bool status) {
        require(_toNumber >= 10, "_toNumber must be >= 10");
        require(_count >= 1, "_count must be >= 1");

        emit RequestVRF({
            caller: msg.sender,
            toNumber: _toNumber,
            count: _count,
            requestTime: block.timestamp
        });

        status = true;
    }
}