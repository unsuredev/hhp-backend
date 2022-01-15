import { INCdelivery } from './../models/dbTypes.d';
import BaseService from "../policies/BaseService";
import { IPricing} from "../models/dbTypes";
import { db } from "../models/db";


export class PricingService extends BaseService {
  constructor() {
    super();
  }
    registerPricing = async (price:IPricing) => {
        try {
            const enc = { ...price };
            let result = await db.Price.create(enc)
            //@ts-ignore
            result = result.toObject();
            return this.RESP("success", "Price registered successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    };


    getPricingDetails = async () => {
        try {
            let result = await db.Price.find()
            if (this._.isNil(result)) {
                throw new Error("E_CONNECTION_S_10000");
            }
            return this.RESP("success", "Fetched Price details successfully", result);
        } catch (error) {
            throw error;
        }
    }


    updatePricing = async (value) => {
        try {
            const { _id } = value.data
            const query = { "_id": _id }
            const option = { new: true }
            const result = await db.Price.findOneAndUpdate(query, value.data, option);
            return this.RESP("success", "updated pricing  successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    }


    // REGISTER NC DELIVERY 

    registerNcDelivery = async (value: INCdelivery) => {
        try {
            const enc = { ...value };
            let result = await db.NCdelivery.create(enc)
            //@ts-ignore
            result = result.toObject();
            return this.RESP("success", "NC Delivery registered successfully", { ncdelivery: result });
        } catch (error) {
            throw error;
        }
    };


    // GET NC  

    getNcDelivery = async () => {
        try {
            const result = await db.NCdelivery.find()
            const intallationComplete = await db.Customers.find({ installtatus: "Complete" })
            result[0]['installationComplete'] = intallationComplete.length
            const data = result[0].toObject()
            data['installationComplete'] = intallationComplete.length
            return this.RESP("success", "get NC details  successfully", { NcDetails: data });
        } catch (error) {
            throw error;
        }
    }


    // NC UPDATE 

    updateNcDelivery = async (value) => {
        try {
            const { _id } = value
            const query = { "_id": _id }
            const option = { new: true }
            const result = await db.NCdelivery.findOneAndUpdate(query, value.data, option);
            if (result) {
                const ncData = {
                    "totalLod": result.totalLod,
                    "totalRegulator": result.totalRegulator,
                    "totalPipe": result.totalPipe,
                    "totalBplOven": result.totalBplOven,
                    "totalHpOven": result.totalHpOven,
                    "totalNonHpOven": result.totalNonHpOven,
                    "totalLight": result.totalLight,
                    "totalAmount": result.totalAmount,
                    "totalAmountDue": result.totalAmountDue
                }
                let ncHistory = await db.NCdeliveryHistory.create(ncData)
            }
            return this.RESP("success", "updated pricing  successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    }



        // GET NC history  

        getAllNcDelivery = async () => {
            try {
                const result = await db.NCdeliveryHistory.find()
                return this.RESP("success", " NC history data successfully", { NcDetails: result });
            } catch (error) {
                throw error;
            }
        }
    




}
