"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_tokens = void 0;
const jwt = require("jsonwebtoken");
const constant_1 = require("../config/constant");
exports.generate_tokens = (type, data) => {
    const { email, user_id } = data;
    if (type === constant_1.LINK_TYPE_PASSWORD_RESET) {
        const payload = { email: email, LINK_TYPE_PASSWORD_RESET: true };
        const password_reset_token = jwt.sign(payload, constant_1.JWT_SECRET, { expiresIn: constant_1.RESET_PASSWORD_TOKEN_EXPIRES_IN }); // Use different secrets?
        return password_reset_token;
    }
    else if (type === constant_1.LINK_TYPE_EMAIL_VERIFY) {
        const payload = { email: email, LINK_TYPE_EMAIL_VERIFY: true };
        const email_verification_token = jwt.sign(payload, constant_1.JWT_SECRET, { expiresIn: constant_1.EMAIL_VERIFY_TOKEN_EXPIRES_IN }); // Use different secrets?
        return email_verification_token;
    }
    else if (type === "ACCESS_TOKEN") {
        const payload = { user_id: user_id, name: data.name };
        const access_token = jwt.sign(payload, constant_1.JWT_SECRET, { expiresIn: constant_1.ACCESS_TOKEN_EXPIRES_IN }); // Change to async?
        return access_token;
    }
};
//# sourceMappingURL=tokenGeneration.js.map