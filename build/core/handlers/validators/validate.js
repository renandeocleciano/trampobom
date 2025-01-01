"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
class Validate {
    loginUser(data) {
        const rules = {
            email: 'required|email',
            password: 'required'
        };
        return new validatorjs_1.default(data, rules);
    }
}
exports.Validate = Validate;
