"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ERROR_CODES = exports.AWS_BUCKET_NAME = exports.API_VERSION = exports.LINK_TYPE_EMAIL_VERIFY = exports.LINK_TYPE_PASSWORD_RESET = exports.IV_VECTOR = exports.AES_KEY = exports.No_ENCRYPT_RESP_URLS = exports.BYPASS_URLS = exports.NO_BODY_URLS = exports.NODE_ENV = exports.LOGOUT_TOKEN = exports.EMAIL_VERIFY_TOKEN_EXPIRES_IN = exports.RESET_PASSWORD_TOKEN_EXPIRES_IN = exports.ACCESS_TOKEN_EXPIRES_IN = exports.MONGODB_URI = exports.JWT_SECRET = exports.USER_ID_PREPEND_STRING = exports.HTTP_PORT = void 0;
exports.HTTP_PORT = process.env.HTTP_PORT || 3001;
exports.USER_ID_PREPEND_STRING = process.env.USER_ID_PREPEND_STRING || "HHP_";
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jaman:jaman2021@cluster0.1zzim.mongodb.net/users?retryWrites=true&w=majority";
exports.ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '24h';
exports.RESET_PASSWORD_TOKEN_EXPIRES_IN = process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN || '48h';
exports.EMAIL_VERIFY_TOKEN_EXPIRES_IN = process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN || '48h';
exports.LOGOUT_TOKEN = process.env.LOGOUT_TOKEN || "USER_LOGGED_OUT";
exports.NODE_ENV = process.env.NODE_ENV;
exports.NO_BODY_URLS = ['/test', '/user/delete',
    '/device/profileImage', '/user/profileImage', '/user/logout',
    '/test', '/favicon.ico',
    '/user/resetPassword', '/user/verifyEmail'];
exports.BYPASS_URLS = ['/test', '/user/delete',
    '/user/add', '/user/login', '/user/resetPassword', '/test', '/agent/add', '/customer/add', '/customer/uploadimages',
    '/favicon.ico', '/user/verifyEmail',
    '/user/sendResetPasswordLink'];
exports.No_ENCRYPT_RESP_URLS = [];
exports.AES_KEY = process.env.AES_KEY;
exports.IV_VECTOR = process.env.IV_VECTOR;
exports.LINK_TYPE_PASSWORD_RESET = process.env.SWAGGER_USERNAME || "";
exports.LINK_TYPE_EMAIL_VERIFY = process.env.SWAGGER_USERNAME || "";
exports.API_VERSION = "/v1";
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'jamanhpgas';
exports.API_ERROR_CODES = {
    "E_USER_S_10001": {
        "toastMessage": "You have already registered, please login instead",
        "detail": "You are already registered",
        "isOperational": true,
    },
    "E_USER_S_10002": {
        "toastMessage": "Unable to register, please try again later",
        "detail": "unable to create  user",
        "isOperational": false,
    },
    "E_USER_S_10003": {
        "toastMessage": "Password doesnt match, please enter correct password or click on forget password to reset it",
        "detail": "wrong password",
        "isOperational": true,
    },
    "E_USER_S_10004": {
        "toastMessage": "Invalid Credentials, please use correct credentials or contact admin",
        "detail": "User not found",
        "isOperational": true,
    },
    "E_USER_S_10005": {
        "toastMessage": "Your existing password doesnt match, please enter correct password or click on forget password to reset it",
        "detail": "current password doesnt match",
        "isOperational": true,
    },
    "E_USER_S_10006": {
        "toastMessage": "Unable to update user profile, please try again later",
        "detail": "Field not allowed,unable to update ",
        "isOperational": false,
    },
    "E_USER_S_10007": {
        "toastMessage": "Please enter a different Home name, the name you gave already exist",
        "detail": "Duplicate Home Name not allowed",
        "isOperational": true,
    },
    "E_USER_S_10008": {
        "toastMessage": "Unable to send email currently, please try again later",
        "detail": "unable to send mail",
        "isOperational": false,
    },
};
//# sourceMappingURL=constant.js.map