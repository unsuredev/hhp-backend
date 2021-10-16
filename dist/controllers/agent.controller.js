"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const BaseController_1 = require("../policies/BaseController");
const agent_service_1 = require("../services/agent.service");
const Joi = require("@hapi/joi");
class AgentController extends BaseController_1.default {
    constructor(agentService = new agent_service_1.AgentService()) {
        super();
        this.agentService = agentService;
        this.agentJoiSchema = Joi.object()
            .keys({
            name: Joi.string().required(),
            mobile: Joi.string().required(),
            address: Joi.string().required(),
        })
            .required();
        // register a agent
        this.registerAgent = async (req, res, next) => {
            try {
                const decryptedData = req.body;
                // const value = await this.agentJoiSchema.validateAsync(decryptedData,  this.joiOptions);
                const result = await this.agentService.registerAgent(req.body);
                let httpStatusCode = 200;
                return res.status(httpStatusCode).json(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to Register Agent",
                    errorMessage: error.message
                }, error));
            }
        };
        // find all agent
        this.getAgent = async (req, res, next) => {
            try {
                let result = await this.agentService.getAgentslist();
                return res.send(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to getAgent details",
                    errorMessage: error.message
                }, error));
            }
        };
    }
}
exports.AgentController = AgentController;
//# sourceMappingURL=agent.controller.js.map