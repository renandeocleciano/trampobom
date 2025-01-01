"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_map_1 = require("./router-map");
class RouterModule {
    constructor(app) {
        this.express = app;
        this.routerFactory = new router_map_1.RouterModuleFactory();
    }
    exposeRoutes(authenticate) {
        const registeredModules = this.routerFactory.getRegisteredModules();
        if (registeredModules && Array.isArray(registeredModules)) {
            registeredModules
                .forEach(this.extractRouterInfoFromModule.bind(this, authenticate));
        }
    }
    extractRouterInfoFromModule(authenticate, routerfeatModule) {
        if (routerfeatModule) {
            const registeredVerbs = Object.keys(routerfeatModule);
            registeredVerbs.forEach(this.extractInfoByVerb.bind(this, authenticate, routerfeatModule));
        }
    }
    extractInfoByVerb(authenticate, routerfeatModule, registeredVerb) {
        routerfeatModule[registeredVerb].forEach(this.mountRoutes.bind(this, authenticate, registeredVerb));
    }
    mountRoutes(authenticate, registeredVerb, routerInfo) {
        if (routerInfo) {
            const { isProtected, callback, endPoint } = routerInfo;
            isProtected
                ? this.express.route(endPoint).all(authenticate)[registeredVerb](callback)
                : this.express.route(endPoint)[registeredVerb](callback);
        }
    }
}
exports.RouterModule = RouterModule;
