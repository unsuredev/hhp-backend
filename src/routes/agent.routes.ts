import { Router } from "express";
import { AgentController } from "../controllers/agent.controller";
import * as cors from "cors"

const agentRouter = Router();
export default function agentRoutes():Router {
    const AGENT = new AgentController();
    agentRouter.post("/agent/add",cors(), AGENT.registerAgent);
    agentRouter.get("/agent/getall", cors(), AGENT.getAgent);
    return agentRouter;
}
