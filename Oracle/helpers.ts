type Tcontract = {
    ABI: any[],
    Address: string
};

const oracleContractData: Tcontract = {
    ABI: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"string","name":"currencySymbol","type":"string"},{"indexed":false,"internalType":"uint256","name":"requestTime","type":"uint256"}],"name":"RequestPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"toNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"requestTime","type":"uint256"}],"name":"RequestVRF","type":"event"},{"inputs":[{"internalType":"string","name":"_symbol","type":"string"}],"name":"requestPrice","outputs":[{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_toNumber","type":"uint256"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"requestVRF","outputs":[{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
    Address: "0x173a4E4e4DBd1B6c5D171D0fB022f5Da7D297A41"
};

module.exports = { abi: oracleContractData.ABI, address: oracleContractData.Address };