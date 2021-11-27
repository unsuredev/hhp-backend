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
const PricingSchema = new Schema(
    {
        nonHpOvenPricing: {
            type: Number,
        },
        hpOvenPricing: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);



export {
    PricingSchema
}
