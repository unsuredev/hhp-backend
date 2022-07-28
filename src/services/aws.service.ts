import * as AWS from "aws-sdk";
import { AWS_BUCKET_NAME, NODE_ENV } from "../config/constant";
const S3 = new AWS.S3({ signatureVersion: "v4", region: "ap-south-1" });
AWS.config.update({ region: "ap-south-1" });

export const getPreSignedUrlS3 = async (bucket_name: string, object_key: string, expiry: number = 604800) => {
    try {
        const url = await S3.getSignedUrlPromise("getObject", {
            Bucket: bucket_name,
            Key: object_key,
            Expires: expiry,
        });
        return url;
    } catch (error) {
        console.log("getPreSignedUrlS3 error", error);
        throw error;
    }
};

export const deleteS3Object = async (bucket_name: string, object_key: string) => {
    try {
        await S3.deleteObject({ Bucket: bucket_name, Key: object_key });
    } catch (error) {
        throw error;
    }
};

export const uploadFileCustomerPhoto = async (req, res, next) => {
    const key = `photos/customer/${12369854701}/${Date.now()}_jamanhp_${req.body.mainAadhaar}`;
    const fileContent = req.file.buffer;
    const params = {
        Bucket: process.env.AWS_S3_BUCKETNAME,
        Key: key, // File name you want to save as in S3
        Body: fileContent,
        ContentType: req.file.mimetype,
    };
    try {
        const data = await S3.upload(params).promise();
        console.log(`photo uploaded successfully key ${key}`);
        req.file.s3_url = data.Location;
        req.file.key = key;
        next();
    } catch (error) {
        console.log("aws service", error);
    }
};

export const uploadFileUserProfilePhoto = async (req, res, next) => {
    const key = `photos/user/${12369854701}/${Date.now()}_jamanProfile_${req.file.originalname}`;

    const fileContent = req.file.buffer;
    const params = {
        Bucket: process.env.AWS_S3_BUCKETNAME_PROFILE,
        Key: key, // File name you want to save as in S3
        Body: fileContent,
        ContentType: req.file.mimetype,
    };
    try {
        const data = await S3.upload(params).promise();
        console.log(`photo uploaded successfully key ${key}`);
        req.file.s3_url = data.Location;
        req.file.key = key;
        next();
    } catch (error) {
        console.log("aws service", error);
    }
};

export const sendSms = async (message: string, PhoneNumber: string) => {
    var params = {
        Message: message,
        PhoneNumber: "+91" + PhoneNumber,
        // MessageAttributes: {
        //     'AWS.SNS.SMS.SMSType': {
        //         DataType: 'String',
        //         StringValue: 'Transactional'
        //     }
        // }
    };
    console.log("params=>", params);

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise
        .then(function (data) {
            console.log("MessageID is " + data.MessageId);
        })
        .catch(function (err) {
            console.error(err, err.stack);
        });
};
