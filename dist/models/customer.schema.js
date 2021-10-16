"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const schemaOptions = {
    timestamps: true,
    versionKey: false,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
};
const CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    mainAadhaar: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    consumerNo: {
        type: String,
        trim: true,
        unique: true,
    },
    familyAadhaar: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mainAgent: {
        type: String,
        required: true,
        trim: true,
    },
    subAgent: {
        type: String,
        trim: true,
    },
    regNo: {
        type: String,
        trim: true,
        unique: true,
    },
    remarks: {
        type: String,
        trim: true,
    },
    addedBy: {
        type: String,
        trim: true,
    },
    satisfactionLetter: {
        type: String,
        required: false,
    },
    InstalationLetter: {
        type: String,
        required: false,
    },
    otherLetter: {
        type: String,
        required: false,
    }
}, { timestamps: {} });
exports.CustomerSchema = CustomerSchema;
//# sourceMappingURL=customer.schema.js.map