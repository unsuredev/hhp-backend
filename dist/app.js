"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const httpContext = require("express-http-context");
const middlewares_1 = require("./middlewares");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose_1 = require("mongoose");
const mung = require("express-mung");
exports.app = express();
const user_routes_1 = require("./routes/user.routes");
const agent_routes_1 = require("./routes/agent.routes");
const customer_routes_1 = require("./routes/customer.routes");
const constant_1 = require("./config/constant");
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
const corsOptions = {
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
exports.app.use(cors(corsOptions));
exports.app.use(httpContext.middleware);
exports.app.use(middlewares_1.decryptionMiddleware);
exports.app.use(mung.json(middlewares_1.encryptionMiddleware));
exports.app.use(constant_1.API_VERSION, user_routes_1.default());
exports.app.use(constant_1.API_VERSION, agent_routes_1.default());
exports.app.use(constant_1.API_VERSION, customer_routes_1.default());
exports.app.get(`${constant_1.API_VERSION}/test`, (req, res) => {
    return res.status(200).json({ current_time: Date().toString(), name: req.query.name });
});
exports.app.get("/", (_, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<h1 style='font-family:monospace;text-align:center;font-size:72px'><br/><br/><br/>🚀<br/>API is Ready! </h1>");
    return res.end();
});
mongoose_1.set("useCreateIndex", true);
mongoose_1.set("useFindAndModify", false);
//@ts-ignore
mongoose_1.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: false } }).catch(err => {
    console.log(err);
});
//# sourceMappingURL=app.js.map