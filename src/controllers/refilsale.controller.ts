import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import * as Joi from "@hapi/joi";
import * as moment from "moment";
import { RefilSaleService } from "../services/refilSale.service";

export class RefilSaleController extends BaseController {
    constructor(private refilSaleService: RefilSaleService = new RefilSaleService()) {
        super();
    }



    // register refilsale data
    registerAgent = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.body;
            const result = await this.refilSaleService.registerRefaleSale(decryptedData);
            let httpStatusCode = 200
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to register refilsale for this agent ",
                errorMessage: error.message
            }, error));
        }
    };


    // get RefilSale for based on agent
    getRefilSale = async (req: Request, res: Response) => {
        try {
            const result = await this.refilSaleService.getRefilSale(req.body);
            return res.status(200).json({result });
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to get refilSale for agent ",
                errorMessage: error.message
            }, error));
        }
    };
    
        // get All RefilSale for based on agent
        getAllRefilSale = async (req: Request, res: Response) => {
            try {
                const result = await this.refilSaleService.getAllRefilSale(req.body);
                return res.status(200).json({ data: result });
            } catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to get refilSale for agent ",
                    errorMessage: error.message
                }, error));
            }
        };
        

    // update RefilSale
    updateRefilSale = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.refilSaleService.updateRefilSale(req.body)
            return res.status(200).json({ data: result });
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to update refilSale dara",
                errorMessage: error.message
            }, error));
        }
    }

    // delete RefilSale
    deleteRefilSale = async (req: Request, res: Response, next: Next) => {
        try {
            let { customerId } = req.body;
            let result = await this.refilSaleService.deleteRefilSale(customerId);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(this.ERR({
                status: "failed",
                message: "Unable to delete refilSaleService",
                errorMessage: error.message
            }, error));
        }
    };


}
