import * as CryptoJS from  "crypto-js";
import {AES_KEY,IV_VECTOR} from "../config/constant";

const keyInHex = CryptoJS.enc.Hex.parse(AES_KEY);
const ivInHex = CryptoJS.enc.Hex.parse(IV_VECTOR);

export const ssEncrypt = (resStr)=>{
    return CryptoJS.AES.encrypt(
        resStr,
        keyInHex,
        {
            iv: ivInHex,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
}

export const ssDecrypt=(reqData)=>{
    let dataInBytes  = CryptoJS.AES.decrypt(reqData, keyInHex, {iv: ivInHex, padding: CryptoJS.pad.Pkcs7});
    let decodedStr = dataInBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decodedStr);
}




