"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
class SessionsModule {
    constructor() { }
    config(app, conn) {
        app.use(session({
            secret: '7Wa$5&3W4z9Z-gTs',
            store: new MongoStore({
                mongooseConnection: conn,
                ttl: 1 * 24 * 60 * 60,
                autoRemove: 'native',
                touchAfter: 24 * 3600,
                secret: '7Wa$5&3W4z9Z-gTs'
            }),
            saveUninitialized: false,
            resave: false
        }));
    }
}
exports.SessionsModule = SessionsModule;
