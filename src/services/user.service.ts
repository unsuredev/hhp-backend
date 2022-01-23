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
            let options
            if (!this._.isNil(enc.email)) {
                options = { email: enc.email };
            }
            if (!this._.isNil(enc.mobile)) {
                options = { mobile:enc.mobile };
            }            
            let userExist = await db.Users.findOne(options).exec();
            if (!this._.isNil(userExist)) {
                throw new Error("E_USER_S_10001");
            }
            const user_id = USER_ID_PREPEND_STRING + uuidv4();
            enc.user_id = user_id;
            enc.role="user"
            const access_token = generate_tokens("ACCESS_TOKEN", {user_id: user_id , name:user.name,role:"user"});
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
            let email_present = false;
            let options
            if (login_type==="email") {
                options = { email: email };
            }
            if (login_type==="mobile") {
                options = { mobile: mobile };
            }

            let user = await db.Users.findOne(options).exec();
            console.log("user" , options, user)

            if (this._.isNil(user)) throw new Error("E_USER_S_10004");
            if (user.active===false){
                throw new Error( "You don't have permission to login")
            }

            if (login_type === "email" || login_type==="mobile") {
                if (!user.password){
                    throw new Error("E_USER_S_10019")
                }
                const isMatch = compareSync(password, user.password);
                if (!isMatch) throw new Error("E_USER_S_10003");
            }
         
            user.access_token = generate_tokens("ACCESS_TOKEN", { user_id: user.user_id ,name:user.name ,role:user.role});
            user.last_login_timestamp=new Date()
            const result = await user.save();
                var hour = new Date().getHours();
                // between 00 AM and 11 AM respectively
                if (hour >= 24|| hour <= 11) {
                    console.log("hours", hour)
                    const resetData = {
                        "totalLod": 0,
                        "totalRegulator": 0,
                        "totalPipe": 0,
                        "totalBplOven": 0,
                        "totalHpOven": 0,
                        "totalNonHpOven": 0,
                        "totalLight": 0,
                        "totalAmount": 0,
                        "totalAmountDue": 0,
                    }
                    const Id = "61b4841fa6f9df34ea365755"
                    const ncReset = await db.NCdelivery.findOneAndUpdate({ "_id": Id },resetData,{new:true});
                }

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
            user.is_online=false
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
            const isValid =  await compare(old_password, existingResult.password)
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




    findUser = async (data) => {
        try {
            const { user_id } = data
            
            let result = await db.Users.findOne({ user_id: user_id })
            const user=result.toObject()
            delete user.access_token
            delete user.password
            if (this._.isNil(result)) throw ("user not found")
            //@ts-ignore
            if (result == null) throw "user not found";
            return this.RESP("success", "user found successfully", user);
        } catch (error) {
            throw error;
        }
    };
    

    updateUser = async (value: any) => {
        try {
            const { user } = value
            const query = { "user_id": user.user_id }
            const option = { new: true }
            const result = await db.Users.findOneAndUpdate(query, value, option);
            if (result) {
                return this.RESP("success", "User data updated successfully", result);
            }
        } catch (error) {
            throw error;
        }
    };



    uploadUserProfile = async (userId, url) => {
        try {
            const result = await db.Users.findOne({ "user_id": userId });
            const query = { "user_id": userId }
            const option = { new: true }
            if (result) {
                await db.Users.findOneAndUpdate(query, { $set: { profile_url: url } }, option);
            }
            return this.RESP("success", "Customer photo uploaded successfull    y");
        } catch (error) {
            console.log("error", error)
            throw error;
        }
    };




    chnageUserRole = async (value) => {
        try {
            const { email, role } = value
            const result = await db.Users.findOneAndUpdate({ "email": email } ,{ "role": role });
            return this.RESP("success", "User's role updated successfully");
        } catch (error) {
            throw error;
        }
    }

}
