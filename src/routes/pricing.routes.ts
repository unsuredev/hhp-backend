import { Router } from "express";
import { PricingController } from "../controllers/pricing.controller";
import * as cors from "cors"

const pricingRouter = Router();
export default function pricingRoutes():Router {
    const PRICE = new PricingController();
    pricingRouter.post("/pricing/add",cors(), PRICE.registerPricing);
    pricingRouter.get("/pricing/get", cors(), PRICE.getPricing);
    pricingRouter.post("/pricing/update", cors(), PRICE.updatePricing);
    return pricingRouter;
}
