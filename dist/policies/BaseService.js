"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class BaseService {
    constructor() {
        this.RESP = (status, message, data) => ({ status, message, data });
        this._ = _;
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map