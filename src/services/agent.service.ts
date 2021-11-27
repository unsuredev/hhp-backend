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
      const result = await db.Connection.findOneAndUpdate(query, value.data, option);
      //@ts-ignore
      console.log("result", result, result._id)
      //@ts-ignore
      const salesData = {
        agent: result.agent,
        bplOven: result.bplOven,
        hpOven: result.hpOven,
        load: result.load,
        nonHpOven: result.nonHpOven,
        paidAmount: result.paidAmount,
        paidLight: result.paidLight,
        pipe: result.pipe,
        regulator: result.regulator,
        remarks: result.remarks,
        totalAmount: result.totalAmount,
        totalConnection: result.totalConnection,
        totalLight: result.totalLight
      }
      const salesHistory = await db.SalesHistory.create(salesData)
      if (this._.isNil(salesHistory)) {
        throw new Error("Sales history Creation failed");
      }
      return this.RESP("success", "updated connection data successfully", { connection: result });
    } catch (error) {
      throw error;
    }
  }





  getAllSales = async (value) => {
    try {
      const result = await db.SalesHistory.find({agent:value.agent }).exec();
      return this.RESP("success", "agent slaes history details successfully", result);
    } catch (error) {
      throw error;
    }
  }








}
