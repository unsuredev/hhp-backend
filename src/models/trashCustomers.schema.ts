import { Schema, SchemaOptions } from "mongoose";
import { date, number, object } from "@hapi/joi";

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

const TrashCustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            sparse: true,

        },
        mainAadhaar: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            sparse: true,


        },
        consumerNo: {
            type: String,
            trim: true,
            lowercase: true,
            sparse: true,

        },
        familyAadhaar: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            sparse: true,

        },
        mainAgent: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        subAgent: {
            type: String,
            trim: true,
            lowercase: true,
        },
        regNo: {
            type: String,
            trim: true,
            lowercase: true,
        },
        remarks: {
            type: String,
            trim: true,
            lowercase: true,
        },
        addedBy: {
            type: String,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: {} }
);

export { TrashCustomerSchema };
