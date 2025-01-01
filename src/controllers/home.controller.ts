import { ICustomRequest, Response } from "../core/helpers/custom-request";
import {
  BaseRouterModule,
  ModuleEndPointMap,
} from "../core/routes/base-router-module";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export class HomeRouterController extends BaseRouterModule {
  constructor() {
    super("");
  }

  protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
    [this.moduleName]: {
      get: [
        {
          endPoint: `${this.getUrlBase()}/`,
          callback: this.home,
          isProtected: false,
        },
        {
          endPoint: `${this.getUrlBase()}profile`,
          callback: this.profile,
          isProtected: false,
        },
      ],
    },
  };

  async home(req: ICustomRequest, res: Response) {
    try {
      const isLogged = await AuthService.authVerify(req.session.token);
      if (isLogged) return res.redirect("/profile");
      res.render("home", { layout: false });
    } catch (error) {
      res.render("error", { error: error });
    }
  }

  async profile(req: ICustomRequest, res: Response) {
    try {
      const userId = await AuthService.getIdByToken(req.session.token);
      const user = await UserService.getById(userId);
      res.render("feed", { user: user.toObject() });
    } catch (error) {
      console.log(error);
      res.render("error", { error: "Ops! Tivemos um erro." });
    }
  }
}
