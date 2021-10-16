"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const cors = require("cors");
const userRouter = express_1.Router();
function userRoutes() {
    const USER = new user_controller_1.UserController();
    userRouter.post("/user/add", cors(), USER.addNewUser);
    userRouter.post("/user/login", cors(), USER.userLogin);
    userRouter.post("/user/logout", cors(), USER.userLogout);
    userRouter.get("/user/getall", cors(), USER.getUsers);
    userRouter.post("/user/block", cors(), USER.blockAndUnblock);
    userRouter.post("/user/changepassword", cors(), USER.changePassword);
    return userRouter;
}
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map