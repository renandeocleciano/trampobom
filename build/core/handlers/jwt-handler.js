"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = require('../config/index')();
class JwtHandler {
    constructor() {
    }
    jwtSign(id) {
        return jwt.sign({ _id: id }, config.secret);
    }
    jwtVerify(token) {
        try {
            const tokenVerified = jwt.verify(token, config.secret);
            return tokenVerified;
        }
        catch (error) {
            console.log(`decodedToken: ${error}`);
            return null;
        }
    }
}
exports.JwtHandler = JwtHandler;
