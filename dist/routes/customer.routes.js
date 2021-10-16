"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer.controller");
const cors = require("cors");
const multerHelper_1 = require("../services/multerHelper");
const aws_service_1 = require("../services/aws.service");
const customerRouter = express_1.Router();
function customerRoutes() {
    const CUSTOMER = new customer_controller_1.CustomerController();
    customerRouter.post("/customer/add", cors(), CUSTOMER.registerACustomer);
    customerRouter.post("/customer/find", cors(), CUSTOMER.searchCustomer);
    customerRouter.post("/customer/getCustomerStats", cors(), CUSTOMER.customerStatsData);
    customerRouter.post("/customer/customerbyagent", cors(), CUSTOMER.customerByAgent);
    customerRouter.post("/customer/count", cors(), CUSTOMER.getLiveStats);
    customerRouter.post("/customer/delete", cors(), CUSTOMER.deleteCustomer);
    customerRouter.post("/customer/update", cors(), CUSTOMER.updateCustomer);
    customerRouter.get("/customer/getAll", cors(), CUSTOMER.getAllCustomer);
    customerRouter.get("/customer/trashCustomer", cors(), CUSTOMER.getAllTrashCustomer);
    customerRouter.post("/customer/uploadimages", cors(), multerHelper_1.uploadMulter, aws_service_1.uploadFileUserProfilePhoto, CUSTOMER.uploadUserPhoto);
    return customerRouter;
}
exports.default = customerRoutes;
//# sourceMappingURL=customer.routes.js.map