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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_module_1 = require("../core/routes/base-router-module");
const validate_1 = require("../core/handlers/validators/validate");
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthRouterController extends base_router_module_1.BaseRouterModule {
    constructor() {
        super('auth');
        this.MODULES_ENDPOINT_MAP = {
            [this.moduleName]: {
                post: [
                    {
                        endPoint: `${this.getUrlBase()}/register`,
                        callback: this.register,
                        isProtected: false
                    },
                    {
                        endPoint: `${this.getUrlBase()}/login`,
                        callback: this.login,
                        isProtected: false
                    }
                ],
                get: [
                    {
                        endPoint: `${this.getUrlBase()}/logout`,
                        callback: this.logout,
                        isProtected: true
                    }
                ]
            }
        };
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = new validate_1.Validate().loginUser(req.body);
                if (validate.fails())
                    return res.render('home', { errors: 'Erro ao informar login/senha', layout: false });
                const user = yield user_service_1.default.getByEmail(req.body.login_email);
                if (user) {
                    if (auth_service_1.default.passwordMatch(req.body.login_password, user.password)) {
                        var token = yield auth_service_1.default.getAuthToken(user);
                        req.session.loggedIn = true;
                        req.session.user = user.fname;
                        req.session.token = token;
                        return res.render('home', { errors: 'Se logou', layout: false });
                    }
                }
                res.render('home', { errors: 'Erro ao informar login/senha', layout: false });
            }
            catch (error) {
                console.log(error);
                res.render('home', { errors: 'Erro ao efetuar o login.', layout: false });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                res.render('home', { layout: false });
            }
            catch (error) {
                res.render('home', { errors: 'Erro ao tentar efetuar o cadastro', layout: false });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.destroy();
                res.locals.session.destroy();
                res.redirect('/');
            }
            catch (error) {
                res.render('error', { error: error });
            }
        });
    }
}
exports.AuthRouterController = AuthRouterController;
