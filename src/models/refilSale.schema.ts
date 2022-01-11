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
const RefilSaleSchema = new Schema(
    {
        agent:{
            type:String,
            required: true ,
            unique: true,
        },
        cyclinderLoad: {
            type: Number,
        },
        cyclinderEmpty: {
            type: Number,
        },
        refilRate: {
            type: Number,
        },
        ncSale: {
            type: Number,
        },
        ncSaleRate: {
            type: Number,
        },
        amountPaid: {
            type: Number,
        },
        remarks: {
            type: String,
        },
        totalAmount: {
            type: Number,
        },
        totalAmountDue: {
            type: Number,
        },
        yesterDayAmount: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);



export {
    RefilSaleSchema
}
