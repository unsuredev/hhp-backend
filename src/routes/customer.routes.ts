

import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import * as cors from "cors"
import { uploadMulter } from '../services/multerHelper'
import {uploadFileUserProfilePhoto} from '../services/aws.service'
  const customerRouter = Router();
export default function customerRoutes(): Router {
    const CUSTOMER = new CustomerController();
    customerRouter.post("/customer/add",cors(), CUSTOMER.registerACustomer);
    customerRouter.post("/customer/find", cors(),CUSTOMER.searchCustomer);
    customerRouter.post("/customer/getCustomerStats",cors(), CUSTOMER.customerStatsData);
    customerRouter.post("/customer/customerbyagent",cors(), CUSTOMER.customerByAgent);
    customerRouter.post("/customer/count",cors(), CUSTOMER.getLiveStats);
    customerRouter.post("/customer/delete",cors(), CUSTOMER.deleteCustomer);
    customerRouter.post("/customer/update",cors(), CUSTOMER.updateCustomer);
    customerRouter.get("/customer/getAll",cors(), CUSTOMER.getAllCustomer);
    customerRouter.get("/customer/trashCustomer",cors(), CUSTOMER.getAllTrashCustomer);
    customerRouter.post("/customer/uploadimages", cors(),  uploadMulter, uploadFileUserProfilePhoto,CUSTOMER.uploadUserPhoto);

    return customerRouter;
}



