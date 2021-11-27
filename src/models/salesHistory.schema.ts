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
const salesHIstorySchema = new Schema(
    {
        agent: {
            type: String,
            required: true 
        },
        totalConnection: {
            type: Number,
        },
        load: {
            type: Number,
        },
        regulator: {
            type: Number,
        },
        pipe: {
            type: Number,
        },
        totalLight:{
            type: Number,
        },
        paidLight:{
            type: Number,
        },
        bplOven:{
            type: Number,
        },
        nonHpOven:{
            type: Number,
        },
        hpOven:{
            type: Number,
        },
        totalAmount:{
            type: Number,
        },
        paidAmount:{
            type: Number,
        },
        remarks:
        {
            type: String
        }
    },
    {
        timestamps: true
    }
);



export {
    salesHIstorySchema
}
