"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_router_map_1 = require("../../controllers/modules-router-map");
class RouterModuleFactory {
    constructor() {
        this.routerModulesMap = [];
        this.bootstrapModules(new modules_router_map_1.ModulesRouterMapper());
    }
    bootstrapModules(routerModulesMapper) {
        this.routerModulesMap = routerModulesMapper.registeredModules.map(this.createModules.bind(this));
    }
    createModules(registeredModule) {
        const { moduleName, parser } = registeredModule;
        return new moduleName()[parser]();
    }
    getRegisteredModules() {
        return this.routerModulesMap.map((routerModule) => {
            const moduleName = Object.keys(routerModule)[0];
            return routerModule[moduleName];
        });
    }
}
exports.RouterModuleFactory = RouterModuleFactory;
