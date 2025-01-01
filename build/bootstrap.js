"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core/core");
const mongoConnector_1 = require("./core/database/mongoConnector");
(function () {
    new core_1.Core(new mongoConnector_1.MongoConnector());
})();
