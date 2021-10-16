"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSchema = void 0;
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
const AgentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true
});
exports.AgentSchema = AgentSchema;
//# sourceMappingURL=agent.schema.js.map