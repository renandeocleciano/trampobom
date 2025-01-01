const handlebars = require('express-handlebars');
const { viewPath, viewPathLayout, viewPartials, assetsPath } = require('../config/index')();

export class ViewsModule {

    constructor() {}

    public configEngine(app: any) {
        app.set('view engine', 'hbs');
        app.engine('hbs', handlebars({
            extname: 'hbs',
            layoutsDir: process.cwd() + viewPathLayout,
            partialsDir: process.cwd() + viewPartials,
            helpers: require('../helpers/hbs-helpers'),
            defaultLayout: 'index'
        }))
    }

    public configStaticPaths(app: any, express: any) {
        app.set('views', process.cwd() + viewPath);
        app.use('/', express.static(process.cwd() + assetsPath));
    }
}