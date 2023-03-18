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

contract Test is IOracle {
  address public immutable oracle;
  address public immutable owner = msg.sender;

  uint256 public symbolPrice;
  uint256[] public numbers;

  constructor(address _oracle) {
    require(address(_oracle) != address(0), "Invalid oracle address");

    oracle = _oracle;
  }

  function sendPriceRequest(string calldata _symbol) external {
    require(msg.sender == owner, "Only owner");

    (bool res, bytes memory data) = oracle.call(
      abi.encodeWithSignature("requestPrice(string)", _symbol)
    );
    require(res, "External call failed");

    bool reqStatus = abi.decode(data, (bool));
    require(reqStatus, "Request failed");
  }

  function sendVRFRequest(
    uint _toNumber,
    uint _count
  ) external {
    require(msg.sender == owner, "Only owner");
    
    (bool res, bytes memory data) = oracle.call(
      abi.encodeWithSignature("requestVRF(uint256,uint256)", _toNumber, _count)
    );
    require(res, "External call failed!");

    bool reqStatus = abi.decode(data, (bool));
    require(reqStatus, "Request failed");
  }

  function getPrice(uint256 _price) external {
    symbolPrice = _price;
  }

  function getVRF(uint[] calldata _numbers) external {
    numbers = _numbers;
  }
}