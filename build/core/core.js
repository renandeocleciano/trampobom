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
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const server_1 = require("./server/server");
const { serverPort } = require('./config/index')();
class Core {
    constructor(dbConnector) {
        this.db = dbConnector;
        this.syncDataBase();
    }
    syncDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const syncData = yield this.db.sync();
                this.databaseSyncHandler(syncData);
            }
            catch (error) {
                console.log(`syncDataBase: ${error}`);
            }
        });
    }
    databaseSyncHandler(dbInfo) {
        this.express = new server_1.Server(dbInfo).express;
        this.upServer();
    }
    upServer() {
        http
            .createServer(this.express)
            .listen(serverPort)
            .on('listening', this.onServerUp.bind(this, serverPort))
            .on('error', this.onServerStartUpError.bind(this));
    }
    onServerUp(port) {
        console.log(`Server is running on port: ${port} `);
    }
    onServerStartUpError(error) {
        console.log(`onServerStartUpError: ${error}`);
    }
}
exports.Core = Core;
