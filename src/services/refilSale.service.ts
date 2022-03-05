import BaseService from "../policies/BaseService";
import { db } from "../models/db";
import { IRefilSaleSchema } from "src/models/dbTypes";

export class RefilSaleService extends BaseService {
    constructor() {
        super();
    }


    registerRefaleSale = async (refilsale:IRefilSaleSchema) => {
        try {
            const enc = { ...refilsale };
            if(!enc.agent){
                throw new Error("PLease provide valide agent number");
            }
            const refilSaleData = {
                agent: enc.agent,
                loadPaid14: 0,
                emptyCycliderRecived14: 0,
                emptyDue14: 0,
                rate14: 0,
                loadPaid19: 0,
                emptyCycliderRecived19: 0,
                emptyDue19: 0,
                rate19: 0,
                loadPaid5: 0,
                emptyCycliderRecived5: 0,
                emptyDue5: 0,
                rate5: 0,
                loadPaid5ftl: 0,
                emptyCycliderRecived5ftl: 0,
                emptyDue5ftl: 0,
                rate5ftl: 0,
                spCategory:"",
                spQantity: 0,
                spRate: 0,
                cyclinderLoad: 0,
                cyclinderEmpty: 0,
                refilRate: 0,
                ncSale: 0,
                remarks:"new register",
                amountPaid: 0,
                totalAmount: 0,
                totalAmountDue: 0,
                totalAmountPaid: 0,
            }

            let result = await db.refilSale.create(refilSaleData)
            //@ts-ignore
            result = result.toObject();
            if (this._.isNil(result)) {
                throw new Error("Not registered agent for refilsale");
            }
            return this.RESP("success", "Refilsale for agent registered successfully", { refilsale: result });
        } catch (error) {
            throw error;
        }
    };


    getRefilSale = async (value) => {
        try {
            const result = await db.refilSale.findOne({ agent: value.agent })
            if (this._.isNil(result.agent)) {
                throw new Error("No result  Found");
            }
            return this.RESP("success", "Fetched agent wise refilsale details successfully", result);
        } catch (error) {
            throw error;
        }
    }

    getAllRefilSale  = async (value) => {
        try {
            const result = await db.refilSale.find()
            return this.RESP("success", "Fetched refilsale details successfully", result);
        } catch (error) {
            throw error;
        }
    }

    updateRefilSale = async (value: any) => {
        try {
            const { _id } = value
            const query = { "agent": value.agent }
            //@ts-ignore
            console.log("agent", value.agent, value)
            const option = { new: true }
            const result = await db.refilSale.findOneAndUpdate(query, {
                $inc: {
                    loadPaid14: value.loadPaid14,
                    emptyCycliderRecived14: value.emptyCycliderRecived14,
                    emptyDue14: value.emptyDue14,
                    rate14: value.rate14,
                    loadPaid19: value.loadPaid19,
                    emptyCycliderRecived19: value.emptyCycliderRecived19,
                    emptyDue19: value.emptyDue19,
                    rate19: value.rate19,
                    loadPaid5: value.loadPaid5,
                    emptyCycliderRecived5: value.emptyCycliderRecived5,
                    emptyDue5: value.emptyDue5,
                    rate5: value.rate5,
                    loadPaid5ftl: value.loadPaid5ftl,
                    emptyCycliderRecived5ftl: value.emptyCycliderRecived5ftl,
                    emptyDue5ftl: value.emptyDue5ftl,
                    rate5ftl: value.rate5ftl,
                    spQantity: value.spQantity,
                    spRate: value.spRate,
                    totalAmount: value.totalAmount,
                    totalAmountDue: value.totalAmountDue,
                    totalAmountPaid: value.totalAmountPaid,
                }, option
            });
            const refilSale = {
                remarks: value.remarks,
                spCategory: value.spCategory,
                totalAmountPaid: value.totalAmountPaid,
            }
            const result2 = await db.refilSale.findOneAndUpdate(query, refilSale, option);
            const refilHistoryObj = {
                loadPaid14: value.loadPaid14,
                emptyCycliderRecived14: value.emptyCycliderRecived14,
                emptyDue14: value.emptyDue14,
                rate14: value.rate14,
                loadPaid19: value.loadPaid19,
                emptyCycliderRecived19: value.emptyCycliderRecived19,
                emptyDue19: value.emptyDue19,
                rate19: value.rate19,
                loadPaid5: value.loadPaid5,
                emptyCycliderRecived5: value.emptyCycliderRecived5,
                emptyDue5: value.emptyDue5,
                rate5: value.rate5,
                loadPaid5ftl: value.loadPaid5ftl,
                emptyCycliderRecived5ftl: value.emptyCycliderRecived5ftl,
                emptyDue5ftl: value.emptyDue5ftl,
                rate5ftl: value.rate5ftl,
                spQantity: value.spQantity,
                spRate: value.spRate,
                totalAmount: value.totalAmount,
                totalAmountDue: value.totalAmountDue,
                totalAmountPaid: value.totalAmountPaid,
                remarks: value.remarks,
                spCategory: value.spCategory,
                agent: value.agent
            }

            const refilSaleResult = await db.refilSaleHistory.create(refilHistoryObj);


            if (result) {
                return this.RESP("success", "Refil Sale data updated successfully", result);
            }
        } catch (error) {
            throw error;
        }
    };

    deleteRefilSale = async (Id: string) => {
        try {
            //@ts-ignore
            let existCustomer = await db.refilSale.findOne({ "_id": Id }).exec();
            console.log("id", existCustomer)
            if (this._.isNil(existCustomer)) {
                throw "Customer not found";
            }
            let result = await db.refilSale.findByIdAndRemove(Id).exec();
            // if (result.name == null) throw "customer not found";
            return this.RESP("success", "Refil sale deleted successfully", result); 
            //}
        } catch (error) {
            throw error;
        }
    }





}
