import * as dotenv from "dotenv";
dotenv.config();
import * as http from "http";
import { app } from "./app";
import { HTTP_PORT, MONGODB_URI } from "./config/constant";
import { connect, set } from "mongoose";
import * as dbTypes from "./models/dbTypes";
import * as SCHEMAS from "./models/user.schema";

const mongoose_1 = require("mongoose");

set("useCreateIndex", true);
set("useFindAndModify", false);

//@ts-ignore
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: false } }).catch(err => {
    console.log(err);
});

http.createServer(app).listen(process.env.HTTP_PORT || 3001, () => {
    console.log(`server is listening on ${HTTP_PORT}`);
});

