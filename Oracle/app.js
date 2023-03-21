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
var Web3 = require("web3");
var _a = require("./helpers"), abi = _a.abi, address = _a.address;
var _b = require("./sendTx"), Feed = _b.Feed, VRF = _b.VRF;
var web3Ws = new Web3(new Web3.providers.WebsocketProvider("wss://polygon-mumbai.g.alchemy.com/v2/".concat(process.env.ALCHEMY_API)));
var oracle = new web3Ws.eth.Contract(abi, address);
//? Price feeding oracle
oracle.events.RequestPrice({}, function (err, event) { return __awaiter(_this, void 0, void 0, function () {
    var _a, currencySymbol, caller, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!!err) return [3 /*break*/, 23];
                _a = event.returnValues, currencySymbol = _a.currencySymbol, caller = _a.caller;
                _b = currencySymbol;
                switch (_b) {
                    case "eth": return [3 /*break*/, 1];
                    case "btc": return [3 /*break*/, 3];
                    case "sol": return [3 /*break*/, 5];
                    case "dot": return [3 /*break*/, 7];
                    case "matic": return [3 /*break*/, 9];
                    case "ada": return [3 /*break*/, 11];
                    case "trx": return [3 /*break*/, 13];
                    case "tether": return [3 /*break*/, 15];
                    case "ltc": return [3 /*break*/, 17];
                    case "link": return [3 /*break*/, 19];
                }
                return [3 /*break*/, 21];
            case 1: return [4 /*yield*/, Feed("ethereum", caller)];
            case 2:
                _c.sent();
                return [3 /*break*/, 22];
            case 3: return [4 /*yield*/, Feed("bitcoin", caller)];
            case 4:
                _c.sent();
                return [3 /*break*/, 22];
            case 5: return [4 /*yield*/, Feed("solana", caller)];
            case 6:
                _c.sent();
                return [3 /*break*/, 22];
            case 7: return [4 /*yield*/, Feed("polkadot", caller)];
            case 8:
                _c.sent();
                return [3 /*break*/, 22];
            case 9: return [4 /*yield*/, Feed("polygon", caller)];
            case 10:
                _c.sent();
                return [3 /*break*/, 22];
            case 11: return [4 /*yield*/, Feed("cardano", caller)];
            case 12:
                _c.sent();
                return [3 /*break*/, 22];
            case 13: return [4 /*yield*/, Feed("tron", caller)];
            case 14:
                _c.sent();
                return [3 /*break*/, 22];
            case 15: return [4 /*yield*/, Feed("tether", caller)];
            case 16:
                _c.sent();
                return [3 /*break*/, 22];
            case 17: return [4 /*yield*/, Feed("litecoin", caller)];
            case 18:
                _c.sent();
                return [3 /*break*/, 22];
            case 19: return [4 /*yield*/, Feed("chainlink", caller)];
            case 20:
                _c.sent();
                return [3 /*break*/, 22];
            case 21:
                console.log("Invalid symbol received!");
                return [3 /*break*/, 22];
            case 22:
                ;
                _c.label = 23;
            case 23:
                ;
                return [2 /*return*/];
        }
    });
}); });
//? VRF feeding oracle
oracle.events.RequestVRF({}, function (err, event) { return __awaiter(_this, void 0, void 0, function () {
    var _a, caller, toNumber, count;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!!err) return [3 /*break*/, 2];
                _a = event.returnValues, caller = _a.caller, toNumber = _a.toNumber, count = _a.count;
                return [4 /*yield*/, VRF(caller, toNumber, count)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                ;
                return [2 /*return*/];
        }
    });
}); });
