import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import * as Joi from "@hapi/joi";
import { PricingService } from "../services/pricing.service";
import * as moment from "moment";

export class PricingController extends BaseController {
    constructor(private pricingService: PricingService = new PricingService()) {
        super();
    }

    // register a price
    registerPricing = async (req: Request, res: Response, next: Next) => {
        try {
            console.log("here" , req.body)
            const result = await this.pricingService.registerPricing(req.body);
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to Register price",
                errorMessage: error.message
            }, error));
        }
    };




    // find all pricing
    getPricing = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.pricingService.getPricingDetails();
            return res.send(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to getAgent details",
                errorMessage: error.message
            }, error));
        }
    };





    // update 
    updatePricing = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.updatePricing(req.body)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to update Connection",
                errorMessage: error.message
            }, error));
        }
    };

// NC DELIVERY API


    // register a price
    registerNcDelivery = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.registerNcDelivery(req.body)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "add nc delivery ",
                errorMessage: error.message
            }, error));
        }
    };


    // GET NC DELIVERY API 
    getNcdelivery = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.getNcDelivery()
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to update  Nc Delivery",
                errorMessage: error.message
            }, error));
        }
    };



    // NC DELIVERY UPDATE 
    updateNcdelivery = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.updateNcDelivery(req.body)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to update  Nc Delivery",
                errorMessage: error.message
            }, error));
        }
    };



    // NC DELIVERY ALL GET 
    getAllNcdelivery = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.getAllNcDelivery()
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to update  Nc Delivery",
                errorMessage: error.message
            }, error));
        }
    };



// TRANSACTION



    // GET Add TRANSACTION  
    addTodayTransaction = async (req: Request, res: Response, next: Next) => {
        try {
            const result = await this.pricingService.addTodayTransaction(req.body)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to add transaction",
                errorMessage: error.message
            }, error));
        }
    };


    // GET TODAY TRANSACTION  
    getTodayTransaction = async (req: Request, res: Response, next: Next) => {
        try {
            const validatedData = req.body
            const startDateISO = moment(validatedData.start_date);
            const endDateISO = moment(validatedData.end_date).endOf("day");
            const result = await this.pricingService.getTodayTransaction(startDateISO, endDateISO)
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to get transaction",
                errorMessage: error.message
            }, error));
        }
    };


        // Update TODAY TRANSACTION  
        updateTodayTransaction = async (req: Request, res: Response, next: Next) => {
            try {
                const result = await this.pricingService.updateTodayTransaction(req.body)
                let httpStatusCode = 200
                return res.status(httpStatusCode).json(result);
            } catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to update transaction",
                    errorMessage: error.message
                }, error));
            }
        };
    



        //  TRANSACTION  history
        todayTransactionHistory = async (req: Request, res: Response, next: Next) => {
            try {
                const result = await this.pricingService.todayTransactionHistory(req.body)
                let httpStatusCode = 200
                return res.status(httpStatusCode).json(result);
            } catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to get transaction history",
                    errorMessage: error.message
                }, error));
            }
        };
    











}
