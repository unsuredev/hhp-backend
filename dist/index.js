"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app_1 = require("./app");
const constant_1 = require("./config/constant");
const mongoose_2 = require("mongoose");
const mongoose_1 = require("mongoose");
mongoose_2.set("useCreateIndex", true);
mongoose_2.set("useFindAndModify", false);
//@ts-ignore
mongoose_2.connect(constant_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: false } }).catch(err => {
    console.log(err);
});
const host = '0.0.0.0';
http.createServer(app_1.app).listen(process.env.HTTP_PORT || 3001, host, () => {
    console.log(`server is listening on ${constant_1.HTTP_PORT}`);
});
//# sourceMappingURL=index.js.map