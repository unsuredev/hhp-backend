import { Router } from "express";
import { PricingController } from "../controllers/pricing.controller";
import * as cors from "cors"

const pricingRouter = Router();
export default function pricingRoutes():Router {
    const PRICE = new PricingController();
    pricingRouter.post("/pricing/add",cors(), PRICE.registerPricing);
    pricingRouter.get("/pricing/get", cors(), PRICE.getPricing);
    pricingRouter.post("/pricing/update", cors(), PRICE.updatePricing);

    //NC DELIVERY
    pricingRouter.post("/ncdelivery/add", cors(), PRICE.registerNcDelivery);
    pricingRouter.get("/ncdelivery/get", cors(), PRICE.getNcdelivery);
    pricingRouter.post("/ncdelivery/update", cors(), PRICE.updateNcdelivery);
    pricingRouter.get("/ncdelivery/all", cors(), PRICE.getAllNcdelivery);
    // TRANSACTION
    pricingRouter.post("/transaction/add", cors(), PRICE.addTodayTransaction);
    pricingRouter.post("/transaction/get", cors(), PRICE.getTodayTransaction);
    pricingRouter.post("/transaction/update", cors(), PRICE.updateTodayTransaction);
    pricingRouter.get("/transaction/history", cors(), PRICE.todayTransactionHistory);




    return pricingRouter;
}
