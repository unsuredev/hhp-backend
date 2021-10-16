"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const BaseController_1 = require("../policies/BaseController");
const Joi = require("@hapi/joi");
const customer_service_1 = require("../services/customer.service");
const moment = require("moment");
class CustomerController extends BaseController_1.default {
    constructor(customerService = new customer_service_1.CustomerService()) {
        super();
        this.customerService = customerService;
        this.customerJoiSchema = Joi.object()
            .keys({
            name: Joi.string().required(),
            mobile: Joi.string().required(),
            mainAadhaar: Joi.string().required(),
            familyAadhaar: Joi.string().required(),
            consumerNo: Joi.string().optional().empty(""),
            mainAgent: Joi.string().required(),
            subAgent: Joi.string().optional().empty(""),
            remarks: Joi.string().optional().empty(""),
            regNo: Joi.string().optional().empty(""),
            addedBy: Joi.string().optional().empty(""),
        })
            .required();
        this.cutomerUpdateJoiSchema = Joi.object()
            .keys({
            name: Joi.string().optional().empty(""),
            mobile: Joi.string().optional().empty(""),
            mainAadhaar: Joi.string().optional().empty(""),
            familyAadhaar: Joi.string().optional().empty(""),
            consumerNo: Joi.string().optional().empty(""),
            mainAgent: Joi.string().optional().empty(""),
            subAgent: Joi.string().optional().empty(""),
            remarks: Joi.string().optional().empty(""),
            regNo: Joi.string().optional().empty(""),
        })
            .required();
        this.statsDataJoiSchema = Joi.object().keys({
            start_date: Joi.string().required(),
            end_date: Joi.string().required(),
            override_cache: Joi.boolean().default(true),
        });
        this.agentJoiSchema = Joi.object().keys({
            mainAgent: Joi.string().required(),
            override_cache: Joi.boolean().default(true),
        });
        this.registerACustomer = async (req, res, next) => {
            try {
                // const decryptedData = req.decryptedData;
                // const value = await this.customerJoiSchema.validateAsync(decryptedData, this.joiOptions);
                const result = await this.customerService.registerACustomer(req.body);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Bad input!,Check consumer details ",
                    errorMessage: error.message
                }, error));
            }
        };
        //finding a customer from DB
        this.searchCustomer = async (req, res, next) => {
            try {
                // const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body);
                let result = await this.customerService.findCustomer(req.body);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to find Consumer",
                    errorMessage: error.message
                }, error));
            }
        };
        this.customerStatsData = async (req, res, next) => {
            try {
                const validatedData = req.body;
                const startDateISO = moment(validatedData.start_date);
                const endDateISO = moment(validatedData.end_date).endOf("day"); // Timezone issue
                const result = await this.customerService.statsData(startDateISO, endDateISO);
                return res.status(200).json({ data: result });
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to find Consumers data ",
                    errorMessage: error.message
                }, error));
            }
        };
        this.customerByAgent = async (req, res, next) => {
            try {
                // const agentName = await this.agentJoiSchema.validateAsync(req.body, this.joiOptions);
                const result = await this.customerService.statsByAgent(req.body);
                return res.status(200).json({ data: result });
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to find Consumer list ",
                    errorMessage: error.message
                }, error));
            }
        };
        this.getLiveStats = async (req, res) => {
            try {
                const result = await this.customerService.getLiveStats(req.body);
                return res.status(200).json({ data: result });
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to get live stats ",
                    errorMessage: error.message
                }, error));
            }
        };
        // update customer
        this.updateCustomer = async (req, res, next) => {
            try {
                const { _id } = req.body;
                // const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body, this.joiOptions);
                let result = await this.customerService.updateCustomer(req.body);
                return res.status(200).json({ data: result });
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to update consumer",
                    errorMessage: error.message
                }, error));
            }
        };
        this.deleteCustomer = async (req, res, next) => {
            try {
                let { customerId } = req.body;
                let result = await this.customerService.deleteCustomerdata(customerId);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to delete consumer",
                    errorMessage: error.message
                }, error));
            }
        };
        this.getAllCustomer = async (req, res) => {
            //@ts-ignore
            const page = parseInt(req.query.page);
            //@ts-ignore
            const limit = parseInt(req.query.limit);
            try {
                const result = await this.customerService.getCustomerlist(page, limit);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to get live stats ",
                    errorMessage: error.message
                }, error));
            }
        };
        this.getAllTrashCustomer = async (req, res) => {
            try {
                const result = await this.customerService.getTrashCustomer();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to get trash customers stats ",
                    errorMessage: error.message
                }, error));
            }
        };
        this.uploadUserPhoto = async (req, res, next) => {
            try {
                // @ts-ignore
                if (req.file && req.file.s3_url) {
                    // @ts-ignore
                    const ImageUrl = req.file.s3_url;
                    //@ts-ignore
                    const aadhaar = req.body;
                    const result = await this.customerService.uploadUserPhoto(aadhaar, ImageUrl);
                    // @ts-ignore
                    return res.status(200).json({
                        status: 'success',
                        message: 'Customer photo uploaded successfully!',
                        // @ts-ignore
                        data: { image_url: req.file.s3_url }
                    });
                }
                // @ts-ignore
                if (req.file.cloudStorageError) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'file uploading failed',
                        data: {}
                    });
                }
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: 'failed',
                    message: 'unable to upload photo',
                    errorMessage: error.message
                }, error));
            }
        };
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map