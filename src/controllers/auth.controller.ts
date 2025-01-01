import { BaseRouterModule, ModuleEndPointMap } from "../core/routes/base-router-module";
import { ICustomRequest, Response } from '../core/helpers/custom-request';
import { Validate } from '../core/handlers/validators/validate';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

export class AuthRouterController extends BaseRouterModule {
    
    constructor() {
        super('auth');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            post: [
                {
                    endPoint: `${ this.getUrlBase() }/register`,
                    callback: this.register,
                    isProtected: false
                },
                {
                    endPoint: `${ this.getUrlBase() }/login`,
                    callback: this.login,
                    isProtected: false
                }
            ],
            get: [
                {
                    endPoint: `${ this.getUrlBase() }/logout`,
                    callback: this.logout,
                    isProtected: true
                }
            ]
        }
    };

    async login(req: ICustomRequest, res: Response) {
        try {
            const validate = new Validate().loginUser(req.body);
            if(validate.fails()) return res.render('home', { errors: 'Erro ao informar login/senha', layout: false});
            const user = await UserService.getByEmail(req.body.login_email);
            if(user) {
                if(AuthService.passwordMatch(req.body.login_password, user.password)) {
                    var token = await AuthService.getAuthToken(user);
                    req.session.loggedIn = true;
                    req.session.user = user.fname;
                    req.session.token = token;
                    return res.redirect('/');
                }
            }
            res.render('home', { errors: 'Usuario não encontrado.', layout: false});
        } catch (error) {
            console.log(error);
            res.render('home', { errors: 'Erro ao efetuar o login.', layout: false });
        }
    }
    async register(req: ICustomRequest, res: Response){
        try {
            const newUser = {
                personalInfo : {
                    firstName: req.body.reg_first_name,
                    lastName: req.body.reg_last_name,
                    birthDay: {
                        day: parseInt(req.body.reg_day),
                        month: parseInt(req.body.reg_month),
                        year: parseInt(req.body.reg_year)
                    }
                },
                email: req.body.reg_email,
                password: req.body.reg_password
            }
            const validate = new Validate().registerUser(newUser);
            if(validate.fails())
                return res.render('home', { errors: 'Dados inválidos. Verifique e tente novamente.', layout: false});
            await UserService.add(newUser);
            res.render('home', { errors: null, layout: false });
        } catch (error) {
            res.render('home', { errors: 'Erro ao tentar efetuar o cadastro', layout: false });
        }
    }

    async logout(req: ICustomRequest, res: Response){
        try {
            req.session.destroy();
            res.locals.session.destroy();
            res.redirect('/');
        } catch (error) {
            res.render('error', { error: error });
        }
    }
}