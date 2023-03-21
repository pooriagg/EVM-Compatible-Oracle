var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("dotenv").config();
var Web3 = require("web3");
var coinGeko = require("coingecko-api");
var coinGekoClient = new coinGeko();
var _a = process.env, PK_1 = _a.PRIVATE_KEY_1, PK_2 = _a.PRIVATE_KEY_2, PK_3 = _a.PRIVATE_KEY_3, PK_4 = _a.PRIVATE_KEY_4, PK_5 = _a.PRIVATE_KEY_5;
var Operators = [PK_1, PK_2, PK_3, PK_4, PK_5];
var web3Http = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/".concat(process.env.ALCHEMY_API)));
function sendPrice(currencySymbol, caller) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, coinGekoClient.coins.fetch(currencySymbol, {}).then(function (_a) {
                        var usd = _a.data.market_data.current_price.usd;
                        return __awaiter(_this, void 0, void 0, function () {
                            var to, data, Tx, chainId, gas, gasPrice, nonce, value, from, price, SELECTED_PRIVATE_KEY;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        price = web3Http.utils.toBN((Number(usd) * Math.pow(10, 8)).toFixed());
                                        SELECTED_PRIVATE_KEY = Operators[Math.floor(Math.random() * 5)];
                                        from = (web3Http.eth.accounts.privateKeyToAccount(SELECTED_PRIVATE_KEY)).address;
                                        to = caller;
                                        value = "0";
                                        chainId = 80001;
                                        return [4 /*yield*/, web3Http.eth.getTransactionCount(from)];
                                    case 1:
                                        nonce = _b.sent();
                                        return [4 /*yield*/, web3Http.eth.getGasPrice()];
                                    case 2:
                                        gasPrice = _b.sent();
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
                                        }, [price]);
                                        return [4 /*yield*/, web3Http.eth.estimateGas({ to: to, data: data, value: value })];
                                    case 3:
                                        gas = _b.sent();
                                        Tx = {
                                            to: to,
                                            value: value,
                                            chainId: chainId,
                                            nonce: nonce,
                                            gas: gas,
                                            gasPrice: gasPrice,
                                            data: data
                                        };
                                        return [4 /*yield*/, web3Http.eth.accounts.signTransaction(Tx, SELECTED_PRIVATE_KEY).then(function (txData) { return __awaiter(_this, void 0, void 0, function () {
                                                var txReceipt;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, web3Http.eth.sendSignedTransaction(txData.rawTransaction)["catch"](function () {
                                                                console.log("Failed to send transaction for feeding the contract.");
                                                            })];
                                                        case 1:
                                                            txReceipt = _a.sent();
                                                            if (typeof txReceipt !== "undefined" && txReceipt.status) {
                                                                console.log("Price feeded to the contract successfully => ".concat(txReceipt.status));
                                                            }
                                                            else {
                                                                console.log("Somthing went wrong! =>", txReceipt.status);
                                                            }
                                                            ;
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })["catch"](function () {
                                                console.log("Failed to sign the transaction.");
                                            })];
                                    case 4:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })["catch"](function () {
                        console.log("Failed to fetch the data!");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
var sendRandomNumbers = function (caller, toNumber, count) { return __awaiter(_this, void 0, void 0, function () {
    var to, data, Tx, chainId, gas, gasPrice, nonce, value, from, SELECTED_PRIVATE_KEY, Random_Numbers, i, _a;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                to = void 0, data = void 0, Tx = void 0, chainId = void 0, gas = void 0, gasPrice = void 0, nonce = void 0, value = void 0, from = void 0;
                SELECTED_PRIVATE_KEY = Operators[Math.floor(Math.random() * 5)];
                Random_Numbers = [];
                for (i = 1; i <= count; ++i) {
                    Random_Numbers.push(Math.floor(Math.random() * Number(toNumber)));
                }
                ;
                from = (web3Http.eth.accounts.privateKeyToAccount(SELECTED_PRIVATE_KEY)).address;
                to = caller;
                chainId = 80001;
                value = 0;
                return [4 /*yield*/, web3Http.eth.getGasPrice()];
            case 1:
                gasPrice = _b.sent();
                return [4 /*yield*/, web3Http.eth.getTransactionCount(from)];
            case 2:
                nonce = _b.sent();
                data = web3Http.eth.abi.encodeFunctionCall({
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
                }, [Random_Numbers]);
                return [4 /*yield*/, web3Http.eth.estimateGas({ to: to, data: data, value: value })];
            case 3:
                gas = _b.sent();
                Tx = {
                    to: to,
                    value: value,
                    chainId: chainId,
                    nonce: nonce,
                    gas: gas,
                    gasPrice: gasPrice,
                    data: data
                };
                return [4 /*yield*/, web3Http.eth.accounts.signTransaction(Tx, SELECTED_PRIVATE_KEY).then(function (txData) { return __awaiter(_this, void 0, void 0, function () {
                        var txReceipt;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, web3Http.eth.sendSignedTransaction(txData.rawTransaction)["catch"](function () {
                                        console.log("Failed to send transaction for feeding the contract.");
                                    })];
                                case 1:
                                    txReceipt = _a.sent();
                                    if (typeof txReceipt !== "undefined" && txReceipt.status) {
                                        console.log("VRF feeded to the contract successfully => ".concat(txReceipt.status));
                                    }
                                    else {
                                        console.log("Somthing went wrong! =>", txReceipt.status);
                                    }
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function () {
                        console.log("Failed to sign the transaction.");
                    })];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = _b.sent();
                console.log("Error occured while generating VRF.");
                return [3 /*break*/, 6];
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); };
module.exports = { Feed: sendPrice, VRF: sendRandomNumbers };
