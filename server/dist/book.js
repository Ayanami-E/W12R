"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true }
});
exports.default = (0, mongoose_1.model)('Book', BookSchema);
