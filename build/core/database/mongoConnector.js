"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { dbHost, dbPort, dbName, dbUser, dbPass } = require('../config/index')();
class MongoConnector {
    constructor() {
        this.loadSchemas();
    }
    sync() {
        try {
            mongoose.set('debug', true);
            return mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { user: dbUser, pass: dbPass, useNewUrlParser: true, useUnifiedTopology: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    loadSchemas() {
        console.log('Loading Schemas...');
        console.log('Schemas loaded...');
    }
}
exports.MongoConnector = MongoConnector;
