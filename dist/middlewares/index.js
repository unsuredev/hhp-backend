"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptionMiddleware = exports.decryptionMiddleware = void 0;
const httpContext = require("express-http-context");
const constant_1 = require("../config/constant");
const db_1 = require("../models/db");
const jsonwebtoken_1 = require("jsonwebtoken");
const encryption_1 = require("../services/encryption");
exports.decryptionMiddleware = (req, res, next) => {
    let decryptedData = null;
    const reqUrl = req.originalUrl.split("?")[0]; // Because of resetpassword token link
    const { encryption } = req.headers; //TODO remove this for prod , security risk
    const requestId = req.headers['x-request-id-nginx'];
    httpContext.set('reqId', requestId);
    if (reqUrl === "/favicon.ico") {
        return res.status(200).send();
    }
    if ((constant_1.NODE_ENV === "local") || constant_1.NO_BODY_URLS.includes(reqUrl.split(constant_1.API_VERSION)[1]) || encryption === "false") {
        //Decryption not needed
        decryptedData = req.body;
    }
    else {
        decryptedData = encryption_1.ssDecrypt(req.body.data);
    }
    // console.log(BYPASS_URLS.includes(reqUrl),reqUrl, BYPASS_URLS)
    if (constant_1.BYPASS_URLS.includes(reqUrl.split(constant_1.API_VERSION)[1])) {
        //These urls dont have user_id
        req.decryptedData = decryptedData;
        next();
    }
    else {
        const { access_token } = req.headers;
        if (!access_token) {
            return res.status(400).json({ "status": "failed", message: "access_token is required" });
        }
        //@ts-ignore
        const user_id = jsonwebtoken_1.decode(access_token).user_id;
        // Checking if access_token is correct
        db_1.db.Users.findOne({ user_id: user_id })
            .then((user) => {
            if (!user || !user.user_id) {
                return res.status(400).json({ status: "failed", message: "user not found" });
            }
            if (user.access_token !== access_token) {
                return res.status(400).json({ status: "invalid", message: "invalid access_token" }); // request by prabhkar to change status
            }
            req.decryptedData = decryptedData;
            // req.decryptedData["user_id"] = user_id;
            req["user"] = { "user_id": user.user_id, "email": user.email }; // For Sentry User Tracking
            // @ts-ignore
            const api_activity_object = { REQ_URL: reqUrl, ...req.decryptedData, ...req.user, "curTime": Date.now() };
            //@ts-ignore
            req.decryptedData["user"] = user; // Not logging the user object, taking up too much space
            next();
        })
            .catch((err) => {
            console.log("error", err);
            return res.status(400).json({ status: "failed", message: "Unknown Error" });
        });
    }
};
exports.encryptionMiddleware = (body, req, res) => {
    const data = body.data;
    const { encryption } = req.headers; //TODO remove this for prod , security risk
    if (constant_1.NODE_ENV === "local" || constant_1.No_ENCRYPT_RESP_URLS.includes[req.originalUrl.split(constant_1.API_VERSION)[1]] || encryption === "false") {
        body.data = data;
    }
    else {
        body.data = encryption_1.ssEncrypt(JSON.stringify(data));
    }
    return body;
};
//# sourceMappingURL=index.js.map