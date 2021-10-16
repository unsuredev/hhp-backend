"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashCustomerSchema = void 0;
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
const TrashCustomerSchema = new mongoose_1.Schema({
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
}, { timestamps: {} });
exports.TrashCustomerSchema = TrashCustomerSchema;
//# sourceMappingURL=trashCustomers.schema.js.map