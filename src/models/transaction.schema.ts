import { Schema, SchemaOptions } from "mongoose";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    versionKey: false,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
};
const TransactionSchema = new Schema(
    {
        loanaccount: {
            type: Number,
        },
        svaccount: {
            type: Number,
        },
        l9payment: {
            type: Number,
        },
        staffsalary: {
            type: Number,
        },
        drivertips: {
            type: Number,
        },
        driverfooding: {
            type: Number,
        },
        extraexpenses: {
            type: Number,
        },
        remarks: {
            type: String,
        },
        todaybalance:{
            type: Number,
        },
        yesterdaybalance:{
            type: Number,
        },
        todayexpense:{
            type: Number,
        },
        todaydue:{
            type: Number,
        },
        totalbalance:{
            type: Number,
        },
        totaldue:{
            type: Number,
        },
        todayClosing:{
            type: Number,
        },
        todayCashPaid:{
            type: Number,
        }
    },
    {
        timestamps: true
    }
);



export {
    TransactionSchema
}
