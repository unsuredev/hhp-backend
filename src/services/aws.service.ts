import * as AWS from 'aws-sdk'
import {
    AWS_BUCKET_NAME, NODE_ENV
} from '../config/constant'
const S3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' })
AWS.config.update({ region: 'ap-south-1' })



export const getPreSignedUrlS3 = async (
    bucket_name: string,
    object_key: string,
    expiry: number = 604800
) => {
    try {
        const url = await S3.getSignedUrlPromise('getObject', {
            Bucket: bucket_name,
            Key: object_key,
            Expires: expiry
        })
        return url
    } catch (error) {
        console.log("getPreSignedUrlS3 error" , error)
        throw error
    }
}

export const deleteS3Object = async (
    bucket_name: string,
    object_key: string
) => {
    try {
        await S3.deleteObject({ Bucket: bucket_name, Key: object_key })
    } catch (error) {
        throw error
    }
}



export const uploadFileUserProfilePhoto = async (req, res, next) => {

    const key = `photos/customer/${12369854701}/${Date.now()}_p_${req.file.originalname}`
    const fileContent = req.file.buffer
    const params = {
        Bucket: process.env.AWS_S3_BUCKETNAME,
        Key: key, // File name you want to save as in S3
        Body: fileContent,
        ContentType: req.file.mimetype
    }
    try {
        const data = await S3.upload(params).promise()
        console.log(`photo uploaded successfully key ${key}`)
        req.file.s3_url = data.Location
        req.file.key = key
        next()
    } catch (error) {
        console.log("aws service" , error)
    }
}



// export const uploadUserPhoto = async (file, userID) => {
//     const key = `photos/users/${userID}/${Date.now()}_${file.originalname}`
//     const fileContent = file.buffer
//     const params = {
//         Bucket: AWS_BUCKET_NAME,
//         Key: key, // File name you want to save as in S3
//         Body: fileContent,
//         ContentType: file.mimetype
//     }
//     try {
//         if (NODE_ENV === 'test') {
//             file.s3_url = key
//         } else {
//             const data = await S3.upload(params).promise()
//             console.log(`File uploaded successfully. ${data.Location} and key ${key}`)
//             const url = await getPreSignedUrlS3(AWS_BUCKET_NAME, key)
//             file.s3_url = url
//         }
//         file.key = key
//     } catch (error) {
//         file.isError = true
//         file.error = error
//     }
// }



// export const uploadUserPhotos = async (req, res, next) => {
//     const { user } = req.decryptedData
//     for (const file of req.files) {
//         await uploadUserPhoto(file, user.user_id)
//     }
//     next()
// }
