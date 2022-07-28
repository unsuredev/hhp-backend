import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import { UserService } from "../services/user.service";
const Joi = require("joi");

export class UserController extends BaseController {
    constructor(private userService: UserService = new UserService()) {
        super();
    }

    private userJoiSchema = Joi.object().keys({
        user: Joi.object().required(),
    });

    private blockSchema = Joi.object()
        .keys({
            email: Joi.string().required().lowercase().email(),
        })
        .required();

    private chnagePasswordSchema = this.userJoiSchema
        .keys({
            user_id: Joi.string().required(),
            old_password: Joi.string().required(),
            new_password: Joi.string().required(),
        })
        .required();

    private UpdateUserSchema = this.userJoiSchema
        .keys({
            user_id: Joi.string().required(),
        })
        .required();

    private addNewUserJoiSchema = Joi.object()
        .keys({
            email: Joi.when("login_type", { is: "email", then: Joi.string().required() }),
            password: Joi.string().required(),
            name: Joi.string().required(),
            login_type: Joi.string().valid("email", "mobile", "google", "facebook").required(),
            mobile: Joi.when("login_type", { is: "mobile", then: Joi.number().required() }),
        })
        .required();

    private loginUserJoiSchema = Joi.object()
        .keys({
            email: Joi.when("login_type", { is: "email", then: Joi.string().required() }),
            password: Joi.string().required(),
            login_type: Joi.string().valid("email", "mobile", "google", "facebook").required(),
            google_account_id: Joi.when("login_type", { is: "google", then: Joi.string().required() }).empty(""),
            mobile: Joi.when("login_type", { is: "mobile", then: Joi.number().required() }),
        })
        .required();

    private logoutUserJoiSchema = this.userJoiSchema.required();

    private roleChangeJoiSchema = Joi.object()
        .keys({
            role: Joi.string().required(),
            email: Joi.string().required(),
        })
        .required();

    addNewUser = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.decryptedData;
            const value = await this.addNewUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
            const result = await this.userService.registerAUser(value);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            console.log("error", error);
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to Register user",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    userLogin = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.decryptedData;
            const value = await this.loginUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
            const result = await this.userService.userLogin(value);
            let httpStatusCode = 200;
            return res.status(httpStatusCode).json(result);
        } catch (error) {
            console.log("error", error);
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to Login user",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    userLogout = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.decryptedData;
            const value = await this.logoutUserJoiSchema.validateAsync(decryptedData, this.joiOptions);
            const result = await this.userService.userLogout(value);
            return res.status(200).json(result);
        } catch (error) {
            console.log("error", error);
            return res.status(400).json(
                this.ERR({
                    status: "failed",
                    message: "Unable to Logout user",
                    errorMessage: error.message,
                })
            );
        }
    };

    // get alll users list
    getUsers = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.userService.getUserslist();
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to users details",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    blockAndUnblock = async (req: Request, res: Response, next: Next) => {
        try {
            const value = await this.blockSchema.validateAsync(req.body, { stripUnknown: true });
            let result = await this.userService.blockandUnblock(value);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to block and unblock user ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    changePassword = async (req: Request, res: Response, next: Next) => {
        try {
            const decryptedData = req.decryptedData;
            const value = await this.chnagePasswordSchema.validateAsync(decryptedData, { stripUnknown: true });
            const result = await this.userService.changePassword(value);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to change password!",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    //finding a user
    searchUser = async (req: Request, res: Response, next: Next) => {
        try {
            const value = await this.UpdateUserSchema.validateAsync(req.body);
            let result = await this.userService.findUser(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to find user",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    // update user
    updateUser = async (req: Request, res: Response, next: Next) => {
        try {
            let result = await this.userService.updateUser(req.body);
            return res.status(200).json({ data: result });
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to update user",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    //UPLOAD profile photo
    uploadOldUserPhoto = async (req: Request, res: Response, next: Next) => {
        try {
            // @ts-ignore
            if (req.file && req.file.s3_url) {
                // @ts-ignore
                const ImageUrl = req.file.s3_url;
                //@ts-ignore
                const { user_id } = req.body;
                //@ts-ignore
                const result = await this.userService.uploadUserProfile(user_id, ImageUrl);
                // @ts-ignore
                return res.status(200).json({
                    status: "success",
                    message: " User profile photo uploaded successfully!",
                    // @ts-ignore
                    data: { image_url: req.file.s3_url },
                });
            }
            // @ts-ignore
            if (req.file.cloudStorageError) {
                return res.status(400).json({
                    status: "failed",
                    message: "file uploading failed",
                    data: {},
                });
            }
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "unable to upload photo",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };

    changeRole = async (req: Request, res: Response, next: Next) => {
        try {
            const value = await this.roleChangeJoiSchema.validateAsync(req.body, { stripUnknown: true });
            let result = await this.userService.chnageUserRole(value);
            return res.send(result);
        } catch (error) {
            return res.status(400).json(
                this.ERR(
                    {
                        status: "failed",
                        message: "Unable to change user role ",
                        errorMessage: error.message,
                    },
                    error
                )
            );
        }
    };
}
