import { Router } from "express";
import { OldCustomerController } from "../controllers/old_customer.controller";
import * as cors from "cors";
const oldCustomerRouter = Router();
export default function oldCustomerRoutes(): Router {
    const CUSTOMER = new OldCustomerController();
    oldCustomerRouter.post("/old/customer/find", cors(), CUSTOMER.searchCustomer);
    oldCustomerRouter.post("/old/customer/findone", cors(), CUSTOMER.searchSingleCustomer);
    oldCustomerRouter.post("/old/customer/count", cors(), CUSTOMER.getLiveStats);
    oldCustomerRouter.post("/old/customer/delete", cors(), CUSTOMER.deleteCustomer);
    oldCustomerRouter.post("/old/customer/update", cors(), CUSTOMER.updateCustomer);
    oldCustomerRouter.get("/old/customer/getAll", cors(), CUSTOMER.getAllCustomer);
    return oldCustomerRouter;
}
