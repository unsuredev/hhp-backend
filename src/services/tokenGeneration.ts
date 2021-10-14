import * as jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRES_IN,
    RESET_PASSWORD_TOKEN_EXPIRES_IN,
    EMAIL_VERIFY_TOKEN_EXPIRES_IN,
    JWT_SECRET,LINK_TYPE_PASSWORD_RESET,LINK_TYPE_EMAIL_VERIFY
} from "../config/constant";
export const generate_tokens = (type, data) => {
    const { email, user_id } = data;
    if (type === LINK_TYPE_PASSWORD_RESET) {
        const payload = { email: email, LINK_TYPE_PASSWORD_RESET: true };
        const password_reset_token = jwt.sign(payload, JWT_SECRET, { expiresIn: RESET_PASSWORD_TOKEN_EXPIRES_IN }); // Use different secrets?
        return password_reset_token;
    } else if (type === LINK_TYPE_EMAIL_VERIFY) {
        const payload = { email: email, LINK_TYPE_EMAIL_VERIFY: true };
        const email_verification_token = jwt.sign(payload, JWT_SECRET, { expiresIn: EMAIL_VERIFY_TOKEN_EXPIRES_IN }); // Use different secrets?
        return email_verification_token;
    } else if (type === "ACCESS_TOKEN") {
        const payload = { user_id: user_id , name:data.name };
        const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN }); // Change to async?
        return access_token;
    }


}

