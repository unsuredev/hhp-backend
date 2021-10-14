import BaseService from "../policies/BaseService";
import {IUser} from "../models/dbTypes";
import {db} from "../models/db";
import {hashSync, genSaltSync, compareSync} from "bcrypt";
import {sign} from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import {
    USER_ID_PREPEND_STRING,
    LOGOUT_TOKEN,
    NODE_ENV,
} from "../config/constant";
import {generate_tokens} from "./tokenGeneration";
const moment = require('moment');
import { compare } from "bcrypt"

export class UserService extends BaseService {
    constructor() {
        super();
    }



    registerAUser = async (user: IUser) => {
        try {
            const enc = {...user};
            // if (enc.password) enc.password = hashSync(enc.password, genSaltSync(12));
            let userExist = await db.Users.findOne({email: user.email}).exec();
            if (!this._.isNil(userExist)) {
                throw new Error("E_USER_S_10001");
            }
            const user_id = USER_ID_PREPEND_STRING + uuidv4();
            enc.user_id = user_id;
            const access_token = generate_tokens("ACCESS_TOKEN", {user_id: user_id , name:user.name});
            enc.access_token = access_token;
            let result = await db.Users.create(enc)
            if (this._.isNil(result)) {
                throw new Error("E_USER_S_10002");
            }
            return this.RESP("success", "Account created, You can login now", {access_token: access_token});
        } catch (error) {
            throw error;
        }
    };


    userLogin = async (decryptedData: IUser) => {
        try {
            const { email, password, mobile_type, login_type,  google_account_id, mobile} = decryptedData; //login_type
            let options = {};
            let email_present = false;
            if (!this._.isNil(email)) {
                email_present = true;
            }
            let user = await db.Users.findOne({email:email}).exec();
            if (this._.isNil(user) && login_type === "email") throw new Error("E_USER_S_10004");
            if (login_type === "email") {
                if (!user.password){
                    throw new Error("E_USER_S_10019")
                }
                const isMatch = compareSync(password, user.password);
                if (!isMatch) throw new Error("E_USER_S_10003");
            }
            if (user.active===false){
                throw new Error( "You don't have permission to login")
              }
            user.access_token = generate_tokens("ACCESS_TOKEN", { user_id: user.user_id ,name:user.name});
            const result = await user.save();
            let message = "Logged In Successfully";
            return this.RESP("success", message, { access_token: result.access_token });
        } catch (error) {
            throw error;
        }
    };




    userLogout = async (decryptedData) => {
        try {
            const {user} = decryptedData
            user.access_token = LOGOUT_TOKEN;
            const result = await user.save();
            return this.RESP("success", "Logged Out Successfully");
        } catch (error) {
            throw error;
        }
    };


    getUserslist = async () => {
        try {
            let result = await db.Users.find()
            return this.RESP("success", "Fetched users details successfully", {users:result });
        } catch (error) {
            throw error;
        }
    }


    blockandUnblock = async (value) => {
        try {
            const { email, active } = value
            let existingResult = await db.Users.findOne({ "email": email }).exec();
            //@ts-ignore
            const result = await db.Users.findOneAndUpdate({ "email": email }, { $set: { active: !existingResult.active ,access_token:"LOGOUT_TOKEN"} });
            return this.RESP("success", "user updated successfully", existingResult);
        } catch (error) {
            throw error;
        }
    }


    changePassword = async (value) => {
        try {
            const { user, old_password, new_password } = value
            let existingResult = await db.Users.findOne({ "user_id": user.user_id }).exec();
            const isValid =  compare(old_password, existingResult.password)
            if (isValid) {
                //@ts-ignore
                const passwordNew = await hashSync(new_password, genSaltSync(12));
                const result = await db.Users.findOneAndUpdate({ "user_id":user.user_id }, { "password": passwordNew });
                return this.RESP("success", "Password changed successfully !");
            }
            throw new Error("Invalid password")
        } catch (error) {
            throw error
        }
    }

}
