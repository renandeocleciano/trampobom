"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessions_module_1 = require("./sessions-module");
const views_module_1 = require("./views-module");
const parsers_module_1 = require("./parsers-module");
const router_1 = require("../routes/router");
const morgan_1 = __importDefault(require("morgan"));
const auth_service_1 = __importDefault(require("../../services/auth.service"));
class Server {
    constructor(db) {
        this.db = db;
        this._express = express_1.default();
        this.configExpress();
        this.routerModule = new router_1.RouterModule(this.express);
        this.router();
    }
    get express() {
        return this._express;
    }
    configExpress() {
        this._express.use(morgan_1.default('combined', { skip: function (req, res) {
                return res.statusCode < 400;
            }
        }));
        new views_module_1.ViewsModule().configEngine(this.express);
        new views_module_1.ViewsModule().configStaticPaths(this.express, express_1.default);
        new parsers_module_1.ParsersModule().configParsers(this.express);
        new sessions_module_1.SessionsModule().config(this.express, this.db.connection);
        this.express.use(function (req, res, next) {
            res.locals.session = req.session;
            next();
        });
    }
    router() {
        this.routerModule.exposeRoutes(auth_service_1.default.authenticate);
    }
}
exports.Server = Server;
