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

}
