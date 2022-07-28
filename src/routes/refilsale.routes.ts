import { RefilSaleController } from "./../controllers/refilsale.controller";
import { Router } from "express";
import * as cors from "cors";

const refilSaleRouter = Router();

export default function refilSaleRoutes(): Router {
    const REFILSALE = new RefilSaleController();
    refilSaleRouter.post("/refilsale/add", cors(), REFILSALE.registerAgent);
    refilSaleRouter.get("/refilsale/getAll", cors(), REFILSALE.getAllRefilSale);
    refilSaleRouter.post("/refilsale/get", cors(), REFILSALE.getRefilSale);
    refilSaleRouter.post("/refilsale/update", cors(), REFILSALE.updateRefilSale);
    refilSaleRouter.post("/refilsale/delete", cors(), REFILSALE.deleteRefilSale);
    refilSaleRouter.post("/refilsale/gethhistory", cors(), REFILSALE.getRefilSaleHistory);

    return refilSaleRouter;
}
