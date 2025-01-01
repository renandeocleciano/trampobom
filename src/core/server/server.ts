import express, { Application } from "express";
import morgan from "morgan";
import AuthServices from "../../services/auth.service";
import { ICustomRequest, Response } from "../helpers/custom-request";
import { RouterModule } from "../routes/router";
import { ParsersModule } from "./parsers-module";
import { SessionsModule } from "./sessions-module";
import { ViewsModule } from "./views-module";

export class Server {
  private _express: Application;
  private db: any;
  private routerModule: RouterModule;

  constructor(db: any) {
    this.db = db;
    this._express = express();
    this.configExpress();
    this.routerModule = new RouterModule(this.express);
    this.router();
  }

  public get express(): Application {
    return this._express;
  }

  private configExpress() {
    this._express.use(
      morgan("combined", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      })
    );
    new ViewsModule().configEngine(this.express);
    new ViewsModule().configStaticPaths(this.express, express);
    new ParsersModule().configParsers(this.express);
    new SessionsModule().config(this.express, this.db.connection);
    this.express.use(function (req: ICustomRequest, res: Response, next: any) {
      res.locals.session = req.session;
      next();
    });
  }

  private router(): void {
    this.routerModule.exposeRoutes(AuthServices.authenticate);
  }
}
