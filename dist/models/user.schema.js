"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const accessTokenSchema = new mongoose_1.Schema({
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    },
    account_id: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const userSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        sparse: true,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    login_type: {
        type: String,
        enum: ["email", "google", "facebook", "apple"],
    },
    google_account_id: {
        type: String,
        unique: true,
        sparse: true
    },
    city: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    access_token: {
        type: String,
    },
}, { timestamps: true });
exports.userSchema = userSchema;
userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt_2.genSalt(10, (err, salt) => {
            if (err) {
                console.log("error", err);
                return next(err);
            }
            // @ts-ignore
            bcrypt_2.hash(this.password, salt, (err, hash) => {
                if (err) {
                    console.log("error", err);
                    return next(err);
                }
                //@ts-ignore
                this.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
userSchema.methods.comparePassword = function (pw) {
    //@ts-ignore
    if (bcrypt_1.compareSync(pw, this.password)) {
        return true;
    }
    else {
        return false;
    }
};
userSchema.index({ email: 'text', name: 'text', mobile: 'text', city: 'text' });
//# sourceMappingURL=user.schema.js.map