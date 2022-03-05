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
        agent: {
            type: String,
            required: true,
            unique: true,
        },
        //load for 14 KG
        loadPaid14: {
            type: Number,
        },
        emptyCycliderRecived14: {
            type: Number,
        },
        emptyDue14: {
            type: Number,
        },
        rate14: {
            type: Number,
        },
        //load for 19 KG
        loadPaid19: {
            type: Number,
        },
        emptyCycliderRecived19: {
            type: Number,
        },
        emptyDue19: {
            type: Number,
        },
        rate19: {
            type: Number,
        },
        //load for 5 KG
        loadPaid5: {
            type: Number,
        },
        emptyCycliderRecived5: {
            type: Number
        },
        emptyDue5: {
            type: Number
        },
        rate5: {
            type: Number
        },
        //load forFTL
        loadPaid5ftl: {
            type: Number
        },
        emptyCycliderRecived5ftl: {
            type: Number
        },
        emptyDue5ftl: {
            type: Number
        },
        rate5ftl: {
            type: Number
        },
        //load SPECIAL 
        spCategory:{
            type: String,
        },
        spQantity:{
            type:Number
        },
        spRate: {
            type: Number
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
        totalAmountPaid: {
            type: Number,
        },
        remarks: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);



export {
    RefilSaleSchema
}
