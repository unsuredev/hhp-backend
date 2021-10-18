import * as httpContext from 'express-http-context'
import { NODE_ENV, NO_BODY_URLS, BYPASS_URLS, No_ENCRYPT_RESP_URLS,API_VERSION } from "../config/constant";
import { db } from "../models/db";
import { decode } from "jsonwebtoken";
import { Request, Response, NextFunction as Next } from "express";
import { ssDecrypt, ssEncrypt } from "../services/hhpencryption";
export const decryptionMiddleware = (req: Request, res: Response, next: Next) => {
    let decryptedData = null;
    const reqUrl = req.originalUrl.split("?")[0]; // Because of resetpassword token link
    const { encryption } = req.headers //TODO remove this for prod , security risk
    const requestId =req.headers['x-request-id-nginx']
    httpContext.set('reqId',requestId)
    if(reqUrl==="/favicon.ico"){
        return res.status(200).send()
    }
    if ((NODE_ENV === "local") || NO_BODY_URLS.includes(reqUrl.split(API_VERSION)[1]) || encryption==="false" ) {
        //Decryption not needed
        decryptedData = req.body;
    } else {
        decryptedData = ssDecrypt(req.body.data);
    }
// console.log(BYPASS_URLS.includes(reqUrl),reqUrl, BYPASS_URLS)
    if (BYPASS_URLS.includes(reqUrl.split(API_VERSION)[1])) {
        //These urls dont have user_id

        req.decryptedData = decryptedData;
        next();
    } else {
        const { access_token } = req.headers;
        if(!access_token){
            return res.status(400).json({"status":"failed",message:"access_token is required"})
        }
        //@ts-ignore
        const user_id = decode(access_token).user_id;
        // Checking if access_token is correct
        db.Users.findOne({ user_id: user_id })
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
                const api_activity_object={ REQ_URL: reqUrl, ...req.decryptedData ,...req.user,"curTime":Date.now()}
                //@ts-ignore
                req.decryptedData["user"] = user; // Not logging the user object, taking up too much space
                next();
            })
            .catch((err) => {
                console.log("error" , err)
                return res.status(400).json({ status: "failed", message: "Unknown Error" });
            });
    }
};


export const encryptionMiddleware = (body, req: Request, res: Response) => {
    const data = body.data;
    const { encryption } = req.headers //TODO remove this for prod , security risk
    if (NODE_ENV === "local" || No_ENCRYPT_RESP_URLS.includes[req.originalUrl.split(API_VERSION)[1]] || encryption==="false" ) {
        body.data = data;
    } else {
        body.data = ssEncrypt(JSON.stringify(data));
    }
    return body;
};
