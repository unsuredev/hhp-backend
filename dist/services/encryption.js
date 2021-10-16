"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssDecrypt = exports.ssEncrypt = void 0;
const CryptoJS = require("crypto-js");
const constant_1 = require("../config/constant");
const keyInHex = CryptoJS.enc.Hex.parse(constant_1.AES_KEY);
const ivInHex = CryptoJS.enc.Hex.parse(constant_1.IV_VECTOR);
exports.ssEncrypt = (resStr) => {
    return CryptoJS.AES.encrypt(resStr, keyInHex, {
        iv: ivInHex,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
};
exports.ssDecrypt = (reqData) => {
    let dataInBytes = CryptoJS.AES.decrypt(reqData, keyInHex, { iv: ivInHex, padding: CryptoJS.pad.Pkcs7 });
    let decodedStr = dataInBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decodedStr);
};
//# sourceMappingURL=encryption.js.map