export const HTTP_PORT: number | string = process.env.HTTP_PORT || 3001;
export const USER_ID_PREPEND_STRING: string = process.env.USER_ID_PREPEND_STRING || "HHP_";
export const JWT_SECRET: string = process.env.JWT_SECRET;
export const MONGODB_URI: string = process.env.MONGODB_URI || "mongodb+srv://jaman:jaman2021@cluster0.1zzim.mongodb.net/hariharpara?retryWrites=true&w=majority";
export const ACCESS_TOKEN_EXPIRES_IN: string = process.env.ACCESS_TOKEN_EXPIRES_IN || '24h';
export const RESET_PASSWORD_TOKEN_EXPIRES_IN: string = process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN || '48h';

export const LOGOUT_TOKEN: string = process.env.LOGOUT_TOKEN || "USER_LOGGED_OUT"
export const NODE_ENV: string = process.env.NODE_ENV
export const NO_BODY_URLS: string[] = ['/test','/ok' ,'/user/delete',
    '/device/profileImage', '/user/profileImage','/user/logout', 
    '/test', '/favicon.ico',
    '/user/resetPassword',  '/user/verifyEmail'];


export const BYPASS_URLS: string[] = [ '/test','/ok' , '/user/delete',
    '/user/add', '/user/login', '/user/resetPassword',  '/test', '/agent/add','/customer/add' ,'/customer/uploadimages',
   '/favicon.ico',  '/user/verifyEmail' ];
export const No_ENCRYPT_RESP_URLS: string[] = [];


export const AES_KEY: string = process.env.AES_KEY;
export const IV_VECTOR: string = process.env.IV_VECTOR;
export const LINK_TYPE_PASSWORD_RESET: string = process.env.SWAGGER_USERNAME || ""
export const LINK_TYPE_EMAIL_VERIFY:string = process.env.SWAGGER_USERNAME||""
export const API_VERSION: string = "/v1";


export const AWS_BUCKET_NAME: string =
  process.env.AWS_BUCKET_NAME || 'jamanhpgas'


export const API_ERROR_CODES = {
    "E_USER_S_10001": { // Used
        "toastMessage": "You have already registered, please login instead",
        "detail": "You are already registered",
        "isOperational": true,
    },
    "E_USER_S_10002": { //Used
        "toastMessage": "Unable to register, please try again later",
        "detail": "unable to create  user",
        "isOperational": false,
    },
    "E_USER_S_10003": { //Used
        "toastMessage": "Password doesnt match, please enter correct password or click on forget password to reset it",
        "detail": "wrong password",
        "isOperational": true,
    },
    "E_USER_S_10004": { //Used
        "toastMessage": "Invalid Credentials, please use correct credentials or contact admin",
        "detail": "User not found",
        "isOperational": true,
    },
    "E_USER_S_10005": { //Used
        "toastMessage": "Your existing password doesnt match, please enter correct password or click on forget password to reset it",
        "detail": "current password doesnt match",
        "isOperational": true,
    },
    "E_CONNECTION_S_10000": { //Used
        "toastMessage": "No data found!",
        "detail": "No data found!",
        "isOperational": true,
    },
    


}
