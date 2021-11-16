import { model} from "mongoose";
import * as SCHEMAS from "./user.schema";
import * as dbTypes from "./dbTypes";
import * as CUSTOMERSCHEMAS from "./customer.schema";
import * as  AGENTSCHEMAS from './agent.schema';
import * as TrashCustomerSchema from './trashCustomers.schema';
import * as OldCustomerSchema from './old_customer.schema'

export const db = {
    Users: model<dbTypes.IUser>("Users", SCHEMAS.userSchema, "hhp_users"),
    Customers: model<dbTypes.ICustomer>("Customers", CUSTOMERSCHEMAS.CustomerSchema ,  "hhp_customers"),
    OldCustomers: model<dbTypes.IOldCustomer>("OldCustomers", OldCustomerSchema.OldCustomerSchema ,  "old_customers"),
    Agent: model<dbTypes.IAgent>("agent", AGENTSCHEMAS.AgentSchema ,  "hhp_agent"),
    trashUsers: model<dbTypes.ITrashCustomers>("trashUsers", TrashCustomerSchema.TrashCustomerSchema, "hhp_trashusers")
};




