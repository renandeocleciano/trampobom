"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handler_1 = require("../core/handlers/jwt-handler");
const bcrypt = __importStar(require("bcrypt"));
const user_service_1 = __importDefault(require("./user.service"));
class AuthService {
    getAuthToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user.generateAuthToken();
        });
    }
    authVerify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token || token == null)
                return false;
            const _token = new jwt_handler_1.JwtHandler().jwtVerify(token);
            if (_token && _token != null) {
                const user = yield user_service_1.default.getByIdAndToken(_token._id, token);
                if (!user)
                    return false;
                return true;
            }
            return false;
        });
    }
    getIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token || token == null)
                return false;
            const _token = new jwt_handler_1.JwtHandler().jwtVerify(token);
            if (_token && _token != null) {
                return _token._id;
            }
            return null;
        });
    }
    passwordMatch(p1, p2) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compareSync(p1, p2);
        });
    }
    authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.session.token;
                if (!token || token == null)
                    return res.render('error', { erro: 'Acesso Negado' });
                const _token = new jwt_handler_1.JwtHandler().jwtVerify(token);
                if (_token && _token != null) {
                    const user = yield user_service_1.default.getByIdAndToken(_token._id, token);
                    if (!user)
                        return res.render('error', { erro: 'Acesso Negado' });
                }
            }
            catch (error) {
                console.log(error);
                res.render('error', { erro: 'Acesso Negado' });
            }
            next();
        });
    }
}
exports.default = new AuthService();
