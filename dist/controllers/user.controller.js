"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const BaseController_1 = require("../policies/BaseController");
const user_service_1 = require("../services/user.service");
const Joi = require("joi");
class UserController extends BaseController_1.default {
    constructor(userService = new user_service_1.UserService()) {
        super();
        this.userService = userService;
        this.userJoiSchema = Joi.object().keys({
            user: Joi.object().required(),
        });
        this.blockSchema = Joi.object()
            .keys({
            email: Joi.string().required().lowercase().email(),
        })
            .required();
        this.chnagePasswordSchema = this.userJoiSchema.keys({
            old_password: Joi.string().required(),
            new_password: Joi.string().required(),
        })
            .required();
        this.addNewUserJoiSchema = Joi.object()
            .keys({
            email: Joi.string().required().lowercase().email(),
            password: Joi.when("login_type", { is: "email", then: Joi.string().required() }),
            name: Joi.string().required(),
            login_type: Joi.string().valid("email", "apple", "google", "facebook").required(),
            mobile: Joi.string().optional().empty(''),
        })
            .required();
        this.loginUserJoiSchema = Joi.object()
            .keys({
            email: Joi.string().lowercase().email().optional().empty(''),
            password: Joi.when("login_type", { is: "email", then: Joi.string().required() }).empty(''),
            mobile: Joi.string().lowercase().optional().empty(''),
            login_type: Joi.string().valid("email", "apple", "google", "facebook").required(),
            google_account_id: Joi.when("login_type", { is: "google", then: Joi.string().required() }).empty(''),
        })
            .required();
        this.logoutUserJoiSchema = this.userJoiSchema.required();
        this.addNewUser = async (req, res, next) => {
            try {
                const decryptedData = req.decryptedData;
                // const value = await this.addNewUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
                const result = await this.userService.registerAUser(req.body);
                let httpStatusCode = 200;
                return res.status(httpStatusCode).json(result);
            }
            catch (error) {
                console.log("error", error);
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to Register user",
                    errorMessage: error.message
                }, error));
            }
        };
        this.userLogin = async (req, res, next) => {
            try {
                const decryptedData = req.decryptedData;
                const value = await this.loginUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
                const result = await this.userService.userLogin(value);
                let httpStatusCode = 200;
                return res.status(httpStatusCode).json(result);
            }
            catch (error) {
                console.log("error", error);
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to Login user",
                    errorMessage: error.message
                }, error));
            }
        };
        this.userLogout = async (req, res, next) => {
            try {
                const decryptedData = req.decryptedData;
                const value = await this.logoutUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
                const result = await this.userService.userLogout(value);
                return res.status(200).json(result);
            }
            catch (error) {
                console.log("error", error);
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to Logout user",
                    errorMessage: error.message
                }));
            }
        };
        // get alll users list 
        this.getUsers = async (req, res, next) => {
            try {
                let result = await this.userService.getUserslist();
                return res.send(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to users details",
                    errorMessage: error.message
                }, error));
            }
        };
        this.blockAndUnblock = async (req, res, next) => {
            try {
                const value = await this.blockSchema.validateAsync(req.body, { stripUnknown: true });
                let result = await this.userService.blockandUnblock(value);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to block and unblock user ",
                    errorMessage: error.message
                }, error));
            }
        };
        this.changePassword = async (req, res, next) => {
            try {
                const decryptedData = req.decryptedData;
                const value = await this.chnagePasswordSchema.validateAsync(decryptedData, { stripUnknown: true });
                const result = await this.userService.changePassword(value);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).json(this.ERR({
                    status: "failed",
                    message: "Unable to change password!",
                    errorMessage: error.message
                }, error));
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map