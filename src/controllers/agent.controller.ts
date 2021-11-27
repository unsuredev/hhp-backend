import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import { AgentService } from "../services/agent.service";
import * as Joi from "@hapi/joi";

export class AgentController extends BaseController {
  constructor(private agentService: AgentService = new AgentService()) {
    super();
  }
  private agentJoiSchema = Joi.object()
    .keys({
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      address: Joi.string().required(),
    })
    .required();


    private agnetConnectionJoiSchema = Joi.object()
    .keys({
        agent: Joi.string().required(),
    })
    .required();



  // register a agent
  registerAgent = async (req: Request, res: Response, next: Next) => {
    try {
      const decryptedData = req.body;
      // const value = await this.agentJoiSchema.validateAsync(decryptedData,  this.joiOptions);
      const result = await this.agentService.registerAgent(req.body);
      let httpStatusCode = 200
      return res.status(httpStatusCode).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to Register Agent",
        errorMessage: error.message
    }, error));    }
  };




  // find all agent
  getAgent = async (req: Request, res: Response, next: Next) => {
    try {
      let result = await this.agentService.getAgentslist();
      return res.send(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to getAgent details",
        errorMessage: error.message
    }, error));    }
  };



  // register a connection
  registerConnection = async (req: Request, res: Response, next: Next) => {
    try {
      const decryptedData = req.body;
      const result = await this.agentService.registerConnection(req.body);
      let httpStatusCode = 200
      return res.status(httpStatusCode).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to Register Connection",
        errorMessage: error.message
    }, error));    }
  };



    // find  agent connection details agent
    getConnection = async (req: Request, res: Response, next: Next) => {
      try {
        let result = await this.agentService.getConnectionDetails(req.body);
        return res.send(result);
      } catch (error) {
        return res.status(400).json(this.ERR({
          status: "failed",
          message: "Unable to getAgent details",
          errorMessage: error.message
      }, error));    }
    };
  

    // update a connection
    updateConnection = async (req: Request, res: Response, next: Next) => {
      try {
        const result = await this.agentService.updateConnection(req.body);
        let httpStatusCode = 200
        return res.status(httpStatusCode).json(result);
      } catch (error) {
        return res.status(400).json(this.ERR({
          status: "failed",
          message: "Unable to update Connection",
          errorMessage: error.message
      }, error));    }
    };


        // get sales  history for agent
        getSales = async (req: Request, res: Response, next: Next) => {
          try {
            const result = await this.agentService.getAllSales(req.body)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
          } catch (error) {
            return res.status(400).json(this.ERR({
              status: "failed",
              message: "Unable to get sales history ",
              errorMessage: error.message
          }, error));    }
        };
    
    
    



}
