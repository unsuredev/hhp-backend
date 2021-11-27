import { Router } from "express";
import { AgentController } from "../controllers/agent.controller";
import * as cors from "cors"

const agentRouter = Router();
export default function agentRoutes():Router {
    const AGENT = new AgentController();
    agentRouter.post("/agent/add",cors(), AGENT.registerAgent);
    agentRouter.get("/agent/getall", cors(), AGENT.getAgent);
    agentRouter.post("/agent/connection/add",cors(), AGENT.registerConnection);
    agentRouter.post("/agent/connection/get", cors(), AGENT.getConnection);
    agentRouter.post("/agent/connection/update", cors(), AGENT.updateConnection);
    agentRouter.post("/agent/slaes/getall", cors(), AGENT.getSales);



    return agentRouter;
}
