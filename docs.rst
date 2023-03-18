======================
Oracle Document
======================

This oracle can bring real world data into EVM compatible blockchains, furthermore you can generate random number (VRF) from outside the blockchain to secure it and then transfer it info the smart contracts.

Oracle interface
==================

.. code-block:: solidity

    interface IOracle {
        function getPrice(
            uint256 _price
        ) external;

        function getVRF(
            uint[] calldata _numbers
        ) external;
    }

Request price feeds
=====================

.. code-block:: solidity

    function requestPrice(string calldata _symbol) reentrant external returns(bool status);

Will give the caller the price of the ``_symbol`` via calling the ``getPrice`` function on the caller side smart contract.

.. warning:: Caller must be a smart contract which impelemented the ``getPrice`` function properly.

----------
Parameters
----------

1. ``_symbol`` - ``string``: The symbol of the currency like eth, btc, tether, ... .

-------
Returns
-------

1. ``status`` - ``bool``: Indicates which request handles successfully or not.

Request random number
=======================

.. code-block:: solidity

    function requestVRF(
        uint _toNumber,
        uint _count
    ) reentrant external returns(bool status);

Will give the caller, a array of random numbers via calling the ``getVRF`` on the caller smart contract side.

.. warning:: Caller must be a smart contract which impelemented the ``getVRF`` function properly.

----------
Parameters
----------

1. ``_toNumber`` - ``uint256``: It tells to the oracle that 'I want a random number from 0 to ``_toNumber`` number'.
2. ``_count`` - ``uint256``: It tells to the oracle that 'I want this ``_count`` amount of random numbers'.

-------
Returns
-------

1. ``status`` - ``bool``: Indicates which request handles successfully or not.
