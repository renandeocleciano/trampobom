"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_controller_1 = require("./home.controller");
const auth_controller_1 = require("./auth.controller");
class ModulesRouterMapper {
    constructor() {
        this.registeredModules = [
            {
                moduleName: home_controller_1.HomeRouterController,
                parser: 'getRoutesFromModules'
            },
            {
                moduleName: auth_controller_1.AuthRouterController,
                parser: 'getRoutesFromModules'
            }
        ];
    }
}
exports.ModulesRouterMapper = ModulesRouterMapper;
