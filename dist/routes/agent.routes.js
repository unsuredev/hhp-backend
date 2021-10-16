"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const cors = require("cors");
const agentRouter = express_1.Router();
function agentRoutes() {
    const AGENT = new agent_controller_1.AgentController();
    agentRouter.post("/agent/add", cors(), AGENT.registerAgent);
    agentRouter.get("/agent/getall", cors(), AGENT.getAgent);
    return agentRouter;
}
exports.default = agentRoutes;
//# sourceMappingURL=agent.routes.js.map