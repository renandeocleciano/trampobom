import * as bcrypt from "bcrypt";
import { JwtHandler } from "../core/handlers/jwt-handler";
import UserService from "./user.service";

class AuthService {
  async getAuthToken(user) {
    return await user.generateAuthToken();
  }

  public async authVerify(token) {
    if (!token || token == null) return false;
    const _token = new JwtHandler().jwtVerify(token);
    if (_token && _token != null) {
      const user = await UserService.getByIdAndToken(_token._id, token);
      if (!user) return false;
      return true;
    }
    return false;
  }

  async getIdByToken(token) {
    if (!token || token == null) return false;
    const _token = new JwtHandler().jwtVerify(token);
    if (_token && _token != null) {
      return _token._id;
    }
    return null;
  }

  async passwordMatch(p1, p2) {
    return bcrypt.compareSync(p1, p2);
  }

  public async authenticate(req, res, next) {
    try {
      const token = req.session.token;
      if (!token || token == null)
        return res.render("error", { erro: "Acesso Negado" });
      const _token = new JwtHandler().jwtVerify(token);
      if (_token && _token != null) {
        const user = await UserService.getByIdAndToken(_token._id, token);
        if (!user) return res.render("error", { erro: "Acesso Negado" });
      }
    } catch (error) {
      console.log(error);
      res.render("error", { erro: "Acesso Negado" });
    }
    next();
  }
}
export default new AuthService();
