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
const NCdeliverySchema = new Schema(
    {
        agent:{
            type:String
        },
        totalLod: {
            type: Number,
        },
        totalRegulator: {
            type: Number,
        },
        totalPipe: {
            type: Number,
        },
        totalBplOven: {
            type: Number,
        },
        totalHpOven: {
            type: Number,
        },
        totalNonHpOven: {
            type: Number,
        },
        totalLight: {
            type: Number,
        },
        totalAmount: {
            type: Number,
        },
        totalAmountDue: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);



export {
    NCdeliverySchema
}
