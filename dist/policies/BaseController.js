"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import log4js = require("log4js");
const _ = require("lodash");
const constant_1 = require("../config/constant");
class BaseController {
    constructor() {
        this.joiOptions = {
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
        this.ERR = (data, error) => {
            // @ts-ignore
            const { status, message, errorMessage } = data;
            const errorObject = { status: status, message: message, errorMessage: errorMessage };
            if (constant_1.API_ERROR_CODES[errorMessage]) {
                errorObject.message = constant_1.API_ERROR_CODES[errorMessage].toastMessage;
            }
            //@ts-ignore
            else if (error && error.name == "MongoError" && error.code == 11000) {
                errorObject.message = error.message;
            }
            return errorObject;
        };
        this._ = _;
        // this.log = log4js.getLogger(this.constructor.name);
    }
}
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map