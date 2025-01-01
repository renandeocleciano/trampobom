import * as bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');

export class ParsersModule {
      constructor() {}

    public configParsers(app: any) {
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(bodyParser.json());
        app.use(cookieParser());
    }
}