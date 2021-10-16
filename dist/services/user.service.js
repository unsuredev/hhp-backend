"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const BaseService_1 = require("../policies/BaseService");
const db_1 = require("../models/db");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const constant_1 = require("../config/constant");
const tokenGeneration_1 = require("./tokenGeneration");
const moment = require('moment');
const bcrypt_2 = require("bcrypt");
class UserService extends BaseService_1.default {
    constructor() {
        super();
        this.registerAUser = async (user) => {
            try {
                const enc = { ...user };
                // if (enc.password) enc.password = hashSync(enc.password, genSaltSync(12));
                let userExist = await db_1.db.Users.findOne({ email: user.email }).exec();
                if (!this._.isNil(userExist)) {
                    throw new Error("E_USER_S_10001");
                }
                const user_id = constant_1.USER_ID_PREPEND_STRING + uuid_1.v4();
                enc.user_id = user_id;
                const access_token = tokenGeneration_1.generate_tokens("ACCESS_TOKEN", { user_id: user_id, name: user.name });
                enc.access_token = access_token;
                let result = await db_1.db.Users.create(enc);
                if (this._.isNil(result)) {
                    throw new Error("E_USER_S_10002");
                }
                return this.RESP("success", "Account created, You can login now", { access_token: access_token });
            }
            catch (error) {
                throw error;
            }
        };
        this.userLogin = async (decryptedData) => {
            try {
                const { email, password, mobile_type, login_type, google_account_id, mobile } = decryptedData; //login_type
                let options = {};
                let email_present = false;
                if (!this._.isNil(email)) {
                    email_present = true;
                }
                let user = await db_1.db.Users.findOne({ email: email }).exec();
                if (this._.isNil(user) && login_type === "email")
                    throw new Error("E_USER_S_10004");
                if (login_type === "email") {
                    if (!user.password) {
                        throw new Error("E_USER_S_10019");
                    }
                    const isMatch = bcrypt_1.compareSync(password, user.password);
                    if (!isMatch)
                        throw new Error("E_USER_S_10003");
                }
                if (user.active === false) {
                    throw new Error("You don't have permission to login");
                }
                user.access_token = tokenGeneration_1.generate_tokens("ACCESS_TOKEN", { user_id: user.user_id, name: user.name });
                const result = await user.save();
                let message = "Logged In Successfully";
                return this.RESP("success", message, { access_token: result.access_token });
            }
            catch (error) {
                throw error;
            }
        };
        this.userLogout = async (decryptedData) => {
            try {
                const { user } = decryptedData;
                user.access_token = constant_1.LOGOUT_TOKEN;
                const result = await user.save();
                return this.RESP("success", "Logged Out Successfully");
            }
            catch (error) {
                throw error;
            }
        };
        this.getUserslist = async () => {
            try {
                let result = await db_1.db.Users.find();
                return this.RESP("success", "Fetched users details successfully", { users: result });
            }
            catch (error) {
                throw error;
            }
        };
        this.blockandUnblock = async (value) => {
            try {
                const { email, active } = value;
                let existingResult = await db_1.db.Users.findOne({ "email": email }).exec();
                //@ts-ignore
                const result = await db_1.db.Users.findOneAndUpdate({ "email": email }, { $set: { active: !existingResult.active, access_token: "LOGOUT_TOKEN" } });
                return this.RESP("success", "user updated successfully", existingResult);
            }
            catch (error) {
                throw error;
            }
        };
        this.changePassword = async (value) => {
            try {
                const { user, old_password, new_password } = value;
                let existingResult = await db_1.db.Users.findOne({ "user_id": user.user_id }).exec();
                const isValid = bcrypt_2.compare(old_password, existingResult.password);
                if (isValid) {
                    //@ts-ignore
                    const passwordNew = await bcrypt_1.hashSync(new_password, bcrypt_1.genSaltSync(12));
                    const result = await db_1.db.Users.findOneAndUpdate({ "user_id": user.user_id }, { "password": passwordNew });
                    return this.RESP("success", "Password changed successfully !");
                }
                throw new Error("Invalid password");
            }
            catch (error) {
                throw error;
            }
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map