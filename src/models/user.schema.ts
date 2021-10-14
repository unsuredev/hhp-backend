import {Schema} from "mongoose";
import {compareSync} from "bcrypt";
import {Document as BaseDocument} from "mongoose";
import {genSalt, hash} from "bcrypt";
interface Document extends BaseDocument {
    createdAt?: Date;
    updatedAt?: Date;
}


const accessTokenSchema = new Schema({
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    },
    account_id: {
        type: String 
    },
    active:{
        type:Boolean,
        default: true
    }
}, {timestamps: true});



const userSchema = new Schema({
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

    active:{
        type:Boolean,
        default: true
    },
    access_token: {
        type: String,
    },
    profile_photo_url: {
        type: String
    }
}, {timestamps: true});

userSchema.pre("save", function (next) {

    if (this.isModified("password")) {
        genSalt(10, (err, salt) => {
            if (err) {
                console.log("error" , err)
                return next(err);
            }
            // @ts-ignore
            hash(this.password, salt, (err, hash) => {
                if (err) {
                    console.log("error" , err)
                    return next(err);
                }
                //@ts-ignore
                this.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
userSchema.methods.comparePassword = function (pw: string): boolean {
    //@ts-ignore
    if (compareSync(pw, this.password)) {
        return true;
    } else {
        return false;
    }
};



userSchema.index({email: 'text', name: 'text', mobile: 'text', city: 'text'});

export {userSchema};
