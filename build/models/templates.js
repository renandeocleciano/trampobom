"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var schema = mongoose_1.default.Schema({
    name: { type: String, required: true },
    filepath: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    downloads: { type: Number },
    created_at: { type: Date, default: Date.now },
}, {
    toJSON: { getters: true }
});
module.exports = mongoose_1.default.model('Templates', schema, 'Templates');
