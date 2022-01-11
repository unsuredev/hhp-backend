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
            // let refaleSaleExist = await db.refilSale.findOne({ agent: enc.agent }).exec();
            // if (!this._.isNil(refaleSaleExist.agent)) {
            //     throw new Error("Refilsale for this agent already registered!");
            // }

            console.log("refils",  enc)

            const refilSaleData = {
                agent: enc.agent,
                filledCyclider: enc.cyclinderLoad,
                emptyCyclider: enc.cyclinderEmpty,
                rateCyclider: enc.refilRate,
                ncSale: enc.ncSale,
                ncRate:enc.ncSaleRate,
                amountPaid: enc.amountPaid,
                remarks: enc.remarks
            }
            let result = await db.refilSale.create(refilSaleData)
            //@ts-ignore
            result = result.toObject();
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
            const { _id } = value.data
            const query = { "_id": _id }
            const option = { new: true }
            console.log("data", _id, value.data)
            const result = await db.refilSale.findOneAndUpdate(query, value.data, option);
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
