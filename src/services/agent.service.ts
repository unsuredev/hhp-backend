import BaseService from "../policies/BaseService";
import { IAgent, } from "../models/dbTypes";
import { db } from "../models/db";


export class AgentService extends BaseService {
  constructor() {
    super();
  }
  registerAgent = async (agent: IAgent) => {
    try {
      const enc = { ...agent };
      let userExist = await db.Agent.findOne({mobile: agent.mobile}).exec();
      if (!this._.isNil(userExist)) {
          throw new Error("Agent already registered!");
      }
      let result = await db.Agent.create(enc)
       //@ts-ignore
      result = result.toObject();
      return this.RESP("success", "Agent registered successfully", { agent:result });
    } catch (error) {
      throw error;
    }
  };




  getAgentslist = async () => {
    try {
        let result = await db.Agent.find()
      return this.RESP("success", "Fetched Agent details successfully", { agents:result });
    } catch (error) {
      throw error;
    }
}



}
