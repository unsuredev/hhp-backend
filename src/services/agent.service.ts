import { IConnection } from './../models/dbTypes.d';
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






// here connection service start

registerConnection = async (connection: IConnection) => {
  try {
    const enc = { ...connection };
    // let userExist = await db.Agent.findOne({mobile: agent.mobile}).exec();
    // if (!this._.isNil(userExist)) {
    //     throw new Error("Agent already registered!");
    // }
    let result = await db.Connection.create(enc)
     //@ts-ignore
    result = result.toObject();
    return this.RESP("success", "Connection registered successfully", { connection:result });
  } catch (error) {
    throw error;
  }
};



getConnectionDetails = async (value) => {
  try {
    const agentName=value.agent
    
      let result = await  db.Connection.findOne({agent:agentName})
      if (this._.isNil(result)) {
        throw new Error("E_CONNECTION_S_10000");
    }
    return this.RESP("success", "Fetched connection details successfully", result );
  } catch (error) {
    throw error;
  }
}



  updateConnection = async (value) => {
    try {
      const { _id } = value.data
      const query = { "_id": _id }
      const option = { new: true }
      console.log("data", _id, value.data)
      const result = await db.Connection.findOneAndUpdate(query, value.data, option);
      return this.RESP("success", "updated connection data successfully", { connection: result });
    } catch (error) {
      throw error;
    }
  }










}
