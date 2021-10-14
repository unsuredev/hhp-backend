import { model} from "mongoose";

import * as SCHEMAS from "./user.schema";
import * as dbTypes from "./dbTypes";

import * as CUSTOMERSCHEMAS from "./customer.schema";
import * as  AGENTSCHEMAS from './agent.schema'
import * as TrashCustomerSchema from './trashCustomers.schema'


export const db = {
    Users: model<dbTypes.IUser>("Users", SCHEMAS.userSchema, "hhp_users"),
    Customers: model<dbTypes.ICustomer>("Customers", CUSTOMERSCHEMAS.CustomerSchema ,  "hhp_customers"),
    Agent: model<dbTypes.IAgent>("agent", AGENTSCHEMAS.AgentSchema ,  "hhp_agent"),
    trashUsers: model<dbTypes.IUser>("trashUsers", TrashCustomerSchema.TrashCustomerSchema, "hhp_trashusers")
};




