"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMulter = void 0;
const multer = require("multer");
const storage = multer.memoryStorage();
exports.uploadMulter = multer({ storage: storage }).single('image');
//# sourceMappingURL=multerHelper.js.map