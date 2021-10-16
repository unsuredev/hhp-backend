"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = require("mongoose");
const SCHEMAS = require("./user.schema");
const CUSTOMERSCHEMAS = require("./customer.schema");
const AGENTSCHEMAS = require("./agent.schema");
const TrashCustomerSchema = require("./trashCustomers.schema");
exports.db = {
    Users: mongoose_1.model("Users", SCHEMAS.userSchema, "hhp_users"),
    Customers: mongoose_1.model("Customers", CUSTOMERSCHEMAS.CustomerSchema, "hhp_customers"),
    Agent: mongoose_1.model("agent", AGENTSCHEMAS.AgentSchema, "hhp_agent"),
    trashUsers: mongoose_1.model("trashUsers", TrashCustomerSchema.TrashCustomerSchema, "hhp_trashusers")
};
//# sourceMappingURL=db.js.map