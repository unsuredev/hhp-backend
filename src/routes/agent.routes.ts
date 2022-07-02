import { Router } from "express";
import { AgentController } from "../controllers/agent.controller";
import * as cors from "cors"

const agentRouter = Router();
export default function agentRoutes():Router {
    const AGENT = new AgentController();
    agentRouter.post("/agent/add",cors(), AGENT.registerAgent);
    agentRouter.get("/agent/getall", cors(), AGENT.getAgent);
    agentRouter.get("/agent/getall/active", cors(), AGENT.getActiveAgent);
    agentRouter.post("/agent/connection/add",cors(), AGENT.registerConnection);
    //retruns all connection details
    agentRouter.post("/agent/connection/get", cors(), AGENT.getConnection);
    //update connection data
    agentRouter.post("/agent/connection/update", cors(), AGENT.updateConnection);
    agentRouter.post("/agent/slaes/getall", cors(), AGENT.getSales);
    agentRouter.get("/agent/slaes/all", cors(), AGENT.getAllSales);
    agentRouter.post("/agent/block", cors(),AGENT.blockAndUnblock);
    agentRouter.post("/agent/sendsms", cors(),AGENT.sendSmsToAgent);
    agentRouter.post("/agent/pendingfingerprint", cors(),AGENT.pendingFingerprint);
    agentRouter.post("/agent/rejectfingerprint", cors(),AGENT.rejectFingerprint);



    return agentRouter;
}
