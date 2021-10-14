declare namespace Express {
    interface Request{
        /* Contains unencrypted Data*/
        decryptedData:{
            email?:string,
            /*Used for selecting which email(verify/resetPassword/resetEmail)*/
            link_type?:string,
            /*Used for Deleting an user*/
            admin_password?:string,
            /*Contains User Document from MongoDB*/
            user?:object,
            /*Used for selecting document field*/
            field?:string,
            device_id?:string,
            device_type?:string,
            user_id?:string,
        };
    }
}