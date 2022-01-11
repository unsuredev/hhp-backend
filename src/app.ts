import * as httpContext from 'express-http-context'
import { decryptionMiddleware, encryptionMiddleware } from "./middlewares";
import { Express } from "express";
import * as bodyParser from "body-parser";
import * as express from "express";
import { CorsOptions } from "cors";
import * as cors from "cors";

import { connect, set } from "mongoose";

import * as mung from "express-mung";
import * as jwt from "jsonwebtoken";
export const app: Express = express();
import userRoutes from "./routes/user.routes";
import agentRoutes from "./routes/agent.routes";
import customerRoutes from './routes/customer.routes'
import oldCustomerRoutes from './routes/old_customer.routes'
import pricingRoutes from './routes/pricing.routes';
import refilSaleRoutes from './routes/refilsale.routes' 
import {  API_VERSION } from "./config/constant";



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser());

const corsOptions: CorsOptions = {
    // origins: ["*"],
    origin: "*",
    allowedHeaders: [
        "at",
        "Content-Type",
        "encryption",
        "access_token",
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    exposedHeaders: [],
};



app.use(cors(corsOptions));
app.use(httpContext.middleware);
app.use(decryptionMiddleware);
app.use(mung.json(encryptionMiddleware));
app.use(API_VERSION, userRoutes());
app.use(API_VERSION, agentRoutes());
app.use(API_VERSION, customerRoutes());
app.use(API_VERSION,oldCustomerRoutes())
app.use(API_VERSION, pricingRoutes())
app.use(API_VERSION,refilSaleRoutes())




app.get(`${API_VERSION}/test`, (req, res) => {
    return res.status(200).json({ current_time: Date().toString(), name: req.query.name });
});
app.get(`${API_VERSION}/ok`,  (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<h1 style='font-family:monospace;text-align:center;font-size:72px'><br/><br/><br/>🚀<br/>API is Ready! </h1>");
    return res.end();
});





set("useCreateIndex", true);
set("useFindAndModify", false);

//@ts-ignore
connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: false } }).catch(err => {
    console.log(err);
});


