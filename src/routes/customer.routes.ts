

import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import * as cors from "cors"
import { uploadMulter } from '../services/multerHelper'
import {uploadFileCustomerPhoto} from '../services/aws.service'
  const customerRouter = Router();
export default function customerRoutes(): Router {
    const CUSTOMER = new CustomerController();
    customerRouter.post("/customer/add",cors(), CUSTOMER.registerACustomer);
    customerRouter.post("/customer/find", cors(),CUSTOMER.searchCustomer);
    customerRouter.post("/customer/getCustomerStats",cors(), CUSTOMER.customerStatsData);
    //last updated documents
    customerRouter.post("/customer/lastupdatedRecords",cors(), CUSTOMER.lastUpdatedcustomers);
    //agent dashboard
    customerRouter.post("/customer/customerbyagent",cors(), CUSTOMER.customerByAgent);
    //agent's pending customer list 
    customerRouter.post("/agent/pendingcustomer",cors(), CUSTOMER.pendingCustomer);
  // all consumer
    customerRouter.post("/agent/allconsumer", cors(), CUSTOMER.allNewCustomer);
  // only consumer list 
    customerRouter.post("/agent/onlyconsumer", cors(), CUSTOMER.onlyConsumerlist);
    customerRouter.post("/customer/count",cors(), CUSTOMER.getLiveStats);
    customerRouter.post("/customer/delete",cors(), CUSTOMER.deleteCustomer);
    customerRouter.post("/customer/update",cors(), CUSTOMER.updateCustomer);
    customerRouter.get("/customer/getAll",cors(), CUSTOMER.getAllCustomer);
    customerRouter.get("/customer/trashCustomer",cors(), CUSTOMER.getAllTrashCustomer);
    customerRouter.post("/customer/uploadimages", cors(),  uploadMulter, uploadFileCustomerPhoto,CUSTOMER.uploadUserPhoto);
    customerRouter.post("/old/customer/uploadimages", cors(),  uploadMulter, uploadFileCustomerPhoto,CUSTOMER.uploadOldUserPhoto);
    return customerRouter;
}
  


