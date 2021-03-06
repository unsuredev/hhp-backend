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

    private blockSchema = Joi.object()
        .keys({
            mobile: Joi.string().required(),
        })
        .required();

    // register a agent
    registerAgent = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.body;
            const result = await this.agentService.registerAgent(req.body);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to Register Agent",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // find all agent
    getAgent = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.getAgentslist();
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to getAgent details",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // find all active agent
    getActiveAgent = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.getActiveAgentslist();
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to get active agent list ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // register a connection
    registerConnection = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.body;
            const result = await this.agentService.registerConnection(req.body);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to Register Connection",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // find  agent connection details agent
    getConnection = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.getConnectionDetails(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to getAgent details",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // update a connection
    updateConnection = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.agentService.updateConnection(req.body);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to update Connection",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // get sales  history for agent
    getSales = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.agentService.getAllSales(req.body);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to get sales history ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // get all agents details
    getAllSales = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.agentService.getAllAgentSales();
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to get all agent connection  ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // block and unblock agent
    blockAndUnblock = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.blockandUnblock(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to block and unblock agent ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // send SMS to agent's mobile
    sendSmsToAgent = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.sendSMS(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to send SMS to agent ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // pending fingerprint list
    pendingFingerprint = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.pendingFingerprint(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable fetch pending fingerprint list ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // reject fingerprint list
    rejectFingerprint = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.agentService.rejectFingerprint(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable fetch reject fingerprint list",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };
}
