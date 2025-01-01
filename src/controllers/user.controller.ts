import { BaseRouterModule, ModuleEndPointMap } from "../core/routes/base-router-module";
import { ICustomRequest, Response } from '../core/helpers/custom-request';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
const sharp = require('../core/helpers/sharp');

export class UserRouterController extends BaseRouterModule {
    
    constructor() {
        super('user');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            post: [
                {
                    endPoint: `${ this.getUrlBase() }/aboutme`,
                    callback: this.aboutme,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/professionalinfo`,
                    callback: this.professionalinfo,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/schoolinfo`,
                    callback: this.schoolinfo,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/courses`,
                    callback: this.courses,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/updatesocial`,
                    callback: this.updatesocial,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/saveprofileimage`,
                    callback: this.saveprofileimage,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/updateresidentialinfo`,
                    callback: this.residentialinfo,
                    isProtected: true
                },
            ],
            get:[
                {
                    endPoint: `${ this.getUrlBase() }/removeprofessionalinfo/:id`,
                    callback: this.removeProfessionalInfo,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/removeschoolinfo/:id`,
                    callback: this.removeSchoolInfo,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/removecourses/:id`,
                    callback: this.removeCourses,
                    isProtected: true
                }
            ]
        }
    };
    async aboutme(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const user   = await UserService.getById(userId);
            user.aboutMe = req.body.aboutme_text;
            await UserService.update(user);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async professionalinfo(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const info = {
                company    : req.body.pf_company,
                office     : req.body.pf_office,
                start_date : req.body.pf_startdate,
                end_date   : req.body.pf_enddate,
                description: req.body.pf_description
            }
            await UserService.addProfessionalInfo(userId, info);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async updatesocial(req: ICustomRequest, res: Response){
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const user   = await UserService.getById(userId);
            user.social.facebook = req.body.sn_facebook;
            user.social.site = req.body.sn_site;
            user.social.youtube = req.body.sn_youtube;
            user.social.github = req.body.sn_github;
            user.social.linkedin = req.body.sn_linkedin;
            await UserService.update(user);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async residentialinfo(req: ICustomRequest, res: Response){
        try {
            const userId                            = await AuthService.getIdByToken(req.session.token);
            const user                              = await UserService.getById(userId);
                  user.residentialInfo.cep          = req.body.ri_facebook;
                  user.residentialInfo.place        = req.body.ri_site;
                  user.residentialInfo.number       = req.body.ri_youtube;
                  user.residentialInfo.complement   = req.body.ri_github;
                  user.residentialInfo.neighborhood = req.body.ri_neighborhood;
                  user.residentialInfo.city         = req.body.ri_city;
                  user.residentialInfo.state        = req.body.ri_state;
            await UserService.update(user);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async schoolinfo(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const info = {
                levelOrName: req.body.si_levelorname,
                institution: req.body.si_institution,
                start_date : req.body.si_startdate,
                end_date   : req.body.si_enddate,
                description: req.body.si_description
            }
            await UserService.addSchoolInfo(userId, info);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async courses(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const info = {
                name       : req.body.si_name,
                institution: req.body.si_institution,
                start_date : req.body.si_startdate,
                end_date   : req.body.si_enddate,
                description: req.body.si_description
            }
            await UserService.addCourse(userId, info);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async saveprofileimage(req: ICustomRequest, res: Response){
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            await sharp.compressImage(req.body.base64Img, { width: 130, height: 130 }, userId);
            const user   = await UserService.getById(userId);
            user.hasPicture = true;
            await UserService.update(user);
            return res.send('OK');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Erro');
        }
    }
    async removeProfessionalInfo(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const professionalinfoId = req.params.id;
            await UserService.removeProfessionalInfo(userId, professionalinfoId);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async removeSchoolInfo(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const schoolinfoId = req.params.id;
            await UserService.removeSchoolInfo(userId, schoolinfoId);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
    async removeCourses(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthService.getIdByToken(req.session.token);
            const coursesId = req.params.id;
            await UserService.removeCourses(userId, coursesId);
            res.redirect('/profile');
        } catch (error) {
            console.log(error);
            res.render('error', { error: 'Ops! Tivemos um erro.' });
        }
    }
}