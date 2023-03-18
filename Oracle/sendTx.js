require("dotenv").config();

const Web3 = require("web3");
const coinGeko = require("coingecko-api");
const coinGekoClient = new coinGeko();

const {
    PRIVATE_KEY_1: PK_1,
    PRIVATE_KEY_2: PK_2,
    PRIVATE_KEY_3: PK_3,
    PRIVATE_KEY_4: PK_4,
    PRIVATE_KEY_5: PK_5
} = process.env;
const Operators = [ PK_1, PK_2, PK_3, PK_4, PK_5 ];

const web3Http = new Web3(
    new Web3.providers.HttpProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`)
);

async function sendPrice(
    currencySymbol,
    caller
) {
    await coinGekoClient.coins.fetch(currencySymbol, {}).then(async ({ data: { market_data: { current_price: { usd } } } }) => {
        let to, data, Tx, chainId, gas, gasPrice, nonce, value, from;
        
        const price = web3Http.utils.toBN((Number(usd) * 10**8).toFixed());
    
        // make the oracle a little bit decentralized
        const SELECTED_PRIVATE_KEY = Operators[ Math.floor(Math.random() * 5) ];
        
        from = (web3Http.eth.accounts.privateKeyToAccount(SELECTED_PRIVATE_KEY)).address;
        to = caller;
        value = "0";
        chainId = 80001;
        nonce = await web3Http.eth.getTransactionCount(from);
        gasPrice = await web3Http.eth.getGasPrice();
        data = web3Http.eth.abi.encodeFunctionCall({
            type: "function",
            name: "getPrice",
            inputs: [
                {
                    type: "uint256",
                    name: "price"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        }, [ price ]);
        gas = await web3Http.eth.estimateGas({ to, data, value });
    
        Tx = {
            to,
            value,
            chainId,
            nonce,
            gas,
            gasPrice,
            data
        };
        
        await web3Http.eth.accounts.signTransaction(Tx, SELECTED_PRIVATE_KEY).then(async (txData) => {
            const txReceipt = await web3Http.eth.sendSignedTransaction(txData.rawTransaction).catch(() => {
                console.log("Failed to send transaction for feeding the contract.");
            });
    
            if (typeof txReceipt !== "undefined" && txReceipt.status) {
                console.log(`Price feeded to the contract successfully => ${txReceipt.status}`);
            } else {
                console.log("Somthing went wrong! =>", txReceipt.status);
            };
        }).catch(() => {
            console.log("Failed to sign the transaction.");
        });
    }).catch(() => {
        console.log("Failed to fetch the data!");
    });
};

const sendRandomNumbers = async (
    caller,
    toNumber,
    count
) => {
    try {
        let to, data, Tx, chainId, gas, gasPrice, nonce, value, from;

        // make the oracle a little bit decentralized
        const SELECTED_PRIVATE_KEY = Operators[ Math.floor(Math.random() * 5) ];

        let Random_Numbers = [];
        for (let i = 1; i <= count; ++i) {
            Random_Numbers.push(
                Math.floor(Math.random() * toNumber)
            );
        };

        from = (web3Http.eth.accounts.privateKeyToAccount(SELECTED_PRIVATE_KEY)).address;
        to = caller;
        chainId = 80001;
        value = 0;
        gasPrice = await web3Http.eth.getGasPrice();
        nonce = await web3Http.eth.getTransactionCount(from);
        data = web3Http.eth.abi.encodeFunctionCall(
            {
                type: "function",
                name: "getVRF",
                inputs: [
                    {
                        name: "_numbers",
                        type: "uint256[]"
                    }
                ],
                stateMutability: "nonpayable",
                outputs: []
            }, [ Random_Numbers ]
        );
        gas = await web3Http.eth.estimateGas({ to, data, value });

        Tx = {
            to,
            value,
            chainId,
            nonce,
            gas,
            gasPrice,
            data
        };

        await web3Http.eth.accounts.signTransaction(Tx, SELECTED_PRIVATE_KEY).then(async (txData) => {
            const txReceipt = await web3Http.eth.sendSignedTransaction(txData.rawTransaction).catch(() => {
                console.log("Failed to send transaction for feeding the contract.");
            });
    
            if (typeof txReceipt !== "undefined" && txReceipt.status) {
                console.log(`VRF feeded to the contract successfully => ${txReceipt.status}`);
            } else {
                console.log("Somthing went wrong! =>", txReceipt.status);
            };
        }).catch(() => {
            console.log("Failed to sign the transaction.");
        });
    } catch {
        console.log("Error occured while generating VRF.");
    };
};

module.exports = { Feed: sendPrice, VRF: sendRandomNumbers };