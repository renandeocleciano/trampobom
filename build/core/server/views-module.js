"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars = require('express-handlebars');
const { viewPath, viewPathLayout, assetsPath } = require('../config/index')();
class ViewsModule {
    constructor() { }
    configEngine(app) {
        app.set('view engine', 'hbs');
        app.engine('hbs', handlebars({
            extname: 'hbs',
            layoutsDir: process.cwd() + viewPathLayout,
            defaultLayout: 'index'
        }));
    }
    configStaticPaths(app, express) {
        app.set('views', process.cwd() + viewPath);
        app.use('/', express.static(process.cwd() + assetsPath));
    }
}
exports.ViewsModule = ViewsModule;
