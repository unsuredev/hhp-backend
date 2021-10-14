"use strict";
import _ = require("lodash");

export default class BaseService {
    protected _: _.LoDashStatic;

    constructor() {
        this._ = _;
    }

    protected RESP = (status: string, message: string, data?:any) => ({status, message, data});
}
