import { sendSms } from './aws.service';
import { IConnection } from './../models/dbTypes.d';
import BaseService from "../policies/BaseService";
import { IAgent, } from "../models/dbTypes";
import { db } from "../models/db";

import { PricingService } from "./pricing.service";

export class AgentService extends BaseService {
  constructor(private pricingService: PricingService = new PricingService()) {
    super();
  }

  
  registerAgent = async (agent: IAgent) => {
    try {
      const enc = { ...agent };
      let userExist = await db.Agent.findOne({ mobile: agent.mobile }).exec();
      if (!this._.isNil(userExist)) {
        throw new Error("Agent already registered!");
      }
      let result = await db.Agent.create(enc)
      //@ts-ignore
      result = result.toObject();
      return this.RESP("success", "Agent registered successfully", { agent: result });
    } catch (error) {
      throw error;
    }
  };




  getAgentslist = async () => {
    try {
      let result = await db.Agent.find()
      return this.RESP("success", "Fetched Agent details successfully", { agents: result });
    } catch (error) {
      throw error;
    }
  }


  getActiveAgentslist = async () => {
    try {
      let result = await db.Agent.find({active:true})
      return this.RESP("success", "Fetched Agent details successfully", { agents: result });
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
      return this.RESP("success", "Connection registered successfully", { connection: result });
    } catch (error) {
      throw error;
    }
  };



  getConnectionDetails = async (value) => {
    try {
      console.log("agent" , value)
      const agentName = value.agent
      const query = { "agent": agentName }
      const option = { new: true }
      const queryN = { "mainAgent": value.agent.toLowerCase() }
      const list = await db.Customers.find({
        mainAgent: value.agent,
        'consumerNo':
        {
          "$nin": [
            "",
            null
          ]
        }
      })
      const intallationComplete = await db.Customers.find({mainAgent: value.agent,installtatus:"Complete" })
      const far2 = await db.Customers.updateMany(queryN, { mainAgent: value.agent.toUpperCase() }, { multi: true })
        await db.Connection.findOneAndUpdate(query, { totalConnection: list.length }, option);
      let result = await db.Connection.findOne({ agent: agentName })
      const connectionData =result.toObject()

      connectionData['installationComplete']=intallationComplete.length
      if (this._.isNil(result)) {
        throw new Error("E_CONNECTION_S_10000");
      }
      return this.RESP("success", "Fetched connection details successfully", connectionData);
    } catch (error) {
      throw error;
    }
  }



  updateConnection = async (value: IConnection) => {
    try {
      const { agent } = value
      const query = { "agent": agent }
      const option = { new: true }
      const connection = await db.Connection.findOne({ agent: agent });

      const result2 = await db.Connection.findOneAndUpdate(query, {
        $inc: {
          load: value.load,
          bplOven: value.bplOven,
          paidLight: value.paidLight,
          pipe: value.pipe,
          regulator: value.regulator,
          totalLight: value.totalLight,
          nonHpOven: value.nonHpOven,
          hpOven: value.hpOven
        }, option
      });


      if(value.paidAmount){
      const result3 = await db.Connection.findOneAndUpdate(query, {
        $inc: {
          paidAmount: value.paidAmount,
        }, option
      });
    }

      const connectionData = {
        agent: connection.agent,
        remarks: value.remarks,
        totalConnection: connection.totalConnection - value.totalConnection,

      }
      const result = await db.Connection.findOneAndUpdate(query, connectionData, option);


      const salesData = {
        agent: value.agent,
        bplOven: value.bplOven,
        hpOven: value.hpOven,
        load: value.load,
        nonHpOven: value.nonHpOven,
        paidAmount: value.paidAmount,
        paidLight: value.paidLight,
        pipe: value.pipe,
        regulator: value.regulator,
        remarks: value.remarks,
        totalAmount: value.totalAmount,
        totalConnection: value.totalConnection,
        totalLight: value.totalLight
      }
      const salesHistory = await db.SalesHistory.create(salesData)
      

      if (this._.isNil(salesHistory)) {
        throw new Error("Sales history Creation failed");
      }

      const Id = "61b4841fa6f9df34ea365755"
      const resultNew = await db.NCdelivery.findOne({ "_id": Id });
      const ncDelivery = resultNew.toObject()
      //@ts-ignore
      ncDelivery.agent = value.agent
      //@ts-ignore
      ncDelivery.totalLod = parseInt(ncDelivery.totalLod) + parseInt(value.load)
      //@ts-ignore
      ncDelivery.totalRegulator = parseInt(ncDelivery.totalRegulator) + parseInt(value.regulator)
      //@ts-ignore
      ncDelivery.totalPipe = parseInt(ncDelivery.totalPipe) + parseInt(value.pipe)
      //@ts-ignore
      ncDelivery.totalBplOven = parseInt(ncDelivery.totalBplOven) + parseInt(value.bplOven)
      //@ts-ignore
      ncDelivery.totalHpOven = parseInt(ncDelivery.totalBplOven) + parseInt(value.hpOven)
      //@ts-ignore
      ncDelivery.totalNonHpOven = parseInt(ncDelivery.totalNonHpOven) + parseInt(value.nonHpOven)
      //@ts-ignore
      ncDelivery.totalLight = parseInt(ncDelivery.totalLight) + parseInt(value.paidLight)
      //@ts-ignore
      ncDelivery.totalAmount = parseInt(ncDelivery.totalAmount) + parseInt(value.paidAmount)

      delete ncDelivery.__v
      delete ncDelivery._id
      //@ts-ignore

      const data = await db.NCdelivery.findOneAndUpdate({ "_id": Id }, ncDelivery);
      //@ts-ignore
      const ncHistory = await db.NCdeliveryHistory.create(ncDelivery)
      console.log("ncHistory", ncHistory)
      return this.RESP("success", "updated connection data successfully", { connection: data });
    } catch (error) {
      throw error;
    }
  }





  getAllSales = async (value) => {
    try {
      const result = await db.SalesHistory.find({ agent: value.agent }).exec();
      return this.RESP("success", "agent slaes history details successfully", result);
    } catch (error) {
      throw error;
    }
  }



  getAllAgentSales = async () => {
    try {
      // fixd pricing document by id 
      const pricing:any= await db.Price.findOne({_id:"61a216bc04bd7fbf514f4481"})

      console.log("pricing", pricing)
      let connectionData: any = await db.Connection.find().exec();
      let result = []
      if (connectionData.length != 0) {
        for (const connection of connectionData) {
          const intallationComplete = await db.Customers.find({
            mainAgent: connection.agent,installtatus:"Complete"})
          const consumer = await db.Customers.find({ mainAgent: connection.agent })
          let newResult = connection.toObject();
            newResult['installationComplete']=intallationComplete.length,
            newResult['totalRegistration']=consumer.length
            newResult['installationPending']=connection.load-intallationComplete.length,
            newResult['amountDue']=connection.nonHpOven*pricing.nonHpOvenPricing+connection.hpOven*pricing.hpOvenPricing-connection.paidAmount
            console.log("connection", connection.nonHpOven , connection.hpOven, connection.paidAmount)

          result.push(newResult)
        }
      }

      return this.RESP("success", "All agents connection  details successfully", result);
    } catch (error) {
      throw error;
    }
  }



  //block and unblock agent for list
  blockandUnblock = async (value) => {
    try {
      const { mobile, active } = value
      let existingResult = await db.Agent.findOne({ "mobile": mobile }).exec();
      //@ts-ignore
      const result = await db.Agent.findOneAndUpdate({ "mobile": mobile }, { $set: { active: !existingResult.active } });
      return this.RESP("success", "Agent updated successfully", existingResult);
    } catch (error) {
      throw error;
    }
  }




  //send sms 
  sendSMS = async (value) => {
    try {
      const {  agent, load,regulator, pipe, hpOven,nonHpOven, light, paidAmount, dueAmount , installationPending } = value.sms
      console.log("agent" , agent , value)
      let agentDetails:any = await db.Agent.findOne({ name: agent }).exec();
      console.log("agentDetails" , agentDetails)

      const message = `Dear ${agent}, update from JAMAN HP GAS, Your connections has delivered: Load: ${load}, Regulator:${regulator}, Pipe: ${pipe}, Light: ${light}, HP Oven: ${hpOven}, NON HP Oven: ${nonHpOven}, Amount Paid: ${paidAmount},Till today Amount Due: ${dueAmount}, Installation Pending: ${installationPending}`
     const result = await sendSms(message, agentDetails.mobile)
      return this.RESP("success", "SMS sent successfully" );
    } catch (error) {
      throw error;
    }
  }


}
