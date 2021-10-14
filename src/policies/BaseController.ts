"use strict";
import { Request, Response, NextFunction as Next } from "express";
import jwt = require("jsonwebtoken");
// import log4js = require("log4js");
import _ = require("lodash");
import {API_ERROR_CODES} from "../config/constant";

export default class BaseController {
    // protected log: log4js.Logger;
    protected _: _.LoDashStatic;
    constructor() {
        this._ = _;
        // this.log = log4js.getLogger(this.constructor.name);
    }
    public joiOptions = {
        errors: {
            wrap: {
                label: "",
            },
        },
        stripUnknown: true,
        abortEarly: false,
    };


    /**
     * @param  {any} error object
     * @param  {Request} restify http request
     * @param  {Response} restify http response
     * @param  {Next} restify next handler
     * (description) sends the error response.
     */
    // protected ErrorResult = (error: any, _req: Request, res: Response, next: Next) => {
    //     let finalMessage: string;
    //     if (error.errors !== undefined && error.errors.length > 0) {
    //         error.errors.map((x: any) => this.log.error(x));
    //     }
    //     if (typeof error === "string") {
    //         finalMessage = error;
    //     } else {
    //         finalMessage = error.name + " " + error.message;
    //     }
    //     const response = {
    //         success: false,
    //         message: finalMessage,
    //     };
    //
    //     this.log.error(finalMessage);
    //     res.status(400);
    //     res.send(response);
    //     return next();
    // };
    /*Replacing message with API_ERROR_CODES[errorMessage].toastMessage if exits, otherwise keeping same*/
    protected ERR = (data:object,error?:Error)=>{
        // @ts-ignore
        const {status,message,errorMessage}=data
        const errorObject={status:status,message:message,errorMessage:errorMessage}
        if(API_ERROR_CODES[errorMessage]){
            errorObject.message=API_ERROR_CODES[errorMessage].toastMessage
        }
        //@ts-ignore
        else if(error && error.name=="MongoError" && error.code==11000){
            errorObject.message=error.message
        }
        return errorObject
    }
}
