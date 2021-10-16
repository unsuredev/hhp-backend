"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const BaseService_1 = require("../policies/BaseService");
const db_1 = require("../models/db");
class AgentService extends BaseService_1.default {
    constructor() {
        super();
        this.registerAgent = async (agent) => {
            try {
                const enc = { ...agent };
                let userExist = await db_1.db.Agent.findOne({ mobile: agent.mobile }).exec();
                if (!this._.isNil(userExist)) {
                    throw new Error("Agent already registered!");
                }
                let result = await db_1.db.Agent.create(enc);
                //@ts-ignore
                result = result.toObject();
                return this.RESP("success", "Agent registered successfully", { agent: result });
            }
            catch (error) {
                throw error;
            }
        };
        this.getAgentslist = async () => {
            try {
                let result = await db_1.db.Agent.find();
                return this.RESP("success", "Fetched Agent details successfully", { agents: result });
            }
            catch (error) {
                throw error;
            }
        };
    }
}
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map