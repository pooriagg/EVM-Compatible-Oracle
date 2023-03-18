const Web3 = require("web3");

const { abi, address } = require("./helpers");
const { Feed, VRF } = require("./sendTx");

const web3Ws = new Web3(
    new Web3.providers.WebsocketProvider(`wss://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`)
);

const oracle = new web3Ws.eth.Contract(
    abi,
    address
);

//? Price feeding oracle
oracle.events.RequestPrice({}, async (err, event) => {
    if (!err) {
        const { returnValues: { currencySymbol, caller } } = event;

        switch(currencySymbol) {
            case "eth":
                await Feed(
                    "ethereum",
                    caller
                );

                break;
            case "btc":
                await Feed(
                    "bitcoin",
                    caller
                );              

                break;
            case "sol":
                await Feed(
                    "solana",
                    caller
                );         

                break;
            case "dot":
                await Feed(
                    "polkadot",
                    caller
                );

                break;
            case "matic":
                await Feed(
                    "polygon",
                    caller
                );

                break;
            case "ada":
                await Feed(
                    "cardano",
                    caller
                );

                break;
            case "trx":
                await Feed(
                    "tron",
                    caller
                );

                break;
            case "tether":
                await Feed(
                    "tether",
                    caller
                );

                break;
            case "ltc":
                await Feed(
                    "litecoin",
                    caller
                );

                break;
            case "link":
                await Feed(
                    "chainlink",
                    caller
                );

                break;
            default:
                console.log("Invalid symbol received!");
                break;      
        };
    };
});

//? VRF feeding oracle
oracle.events.RequestVRF({}, async (err, event) => {
    if (!err) {
        const { returnValues: { caller, toNumber, count } } = event;

        await VRF(
            caller,
            toNumber,
            count
        );
    };
});