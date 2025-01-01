import { Core } from './core/core';
import { MongoConnector } from './core/database/mongoConnector';

(function () {
    new Core(new MongoConnector());
})();