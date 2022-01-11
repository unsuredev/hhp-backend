import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import * as cors from "cors"

const userRouter = Router();
export default function userRoutes():Router {
    const USER = new UserController();
    userRouter.post("/user/add",  cors(),USER.addNewUser);
    userRouter.post("/user/login",  cors(),USER.userLogin);
    userRouter.post("/user/logout", cors(), USER.userLogout);
    userRouter.get("/user/getall",  cors(), USER.getUsers);
    userRouter.post("/user/block", cors(),USER.blockAndUnblock);
    userRouter.post("/user/changepassword",cors(),  USER.changePassword);
    userRouter.post("/user/update",cors(),  USER.updateUser);
    userRouter.post("/user/find",cors(),  USER.searchUser);

    
    return userRouter;
}
