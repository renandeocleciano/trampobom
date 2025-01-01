import { IBaseService } from './base.service';
const userModel = require('../models/user');

class UserService implements IBaseService {

    async add(props: any) : Promise<Boolean> {
        try {
            await userModel.create(props);
            return true;
        } catch (error) {
            console.log(error);
            return false;   
        }
    }
    async addProfessionalInfo(userId: any, info: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId }, { $push: { professionalInfo: info } });
        } catch (error) {
            console.log(error);
        }
     }
    async addSchoolInfo(userId: any, info: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId }, { $push: { schoolInfo: info } });
        } catch (error) {
            console.log(error);
        }
     }
     async addCourse(userId: any, info: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId }, { $push: { courses: info } });
        } catch (error) {
            console.log(error);
        }
     }
    async remove(id: any) : Promise<void> {
        try {
            await userModel.findOneAndRemove({ _id: id });
        } catch (error) {
            console.log(error)
        }
    }
    async removeProfessionalInfo(userId: any, professionalinfoId: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId },{ $pull: { professionalInfo: { _id: professionalinfoId } } }, { new: true });
        } catch (error) {
            console.log(error);
        }
    }
    async removeSchoolInfo(userId: any, schoolInfoId: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId },{ $pull: { schoolInfo: { _id: schoolInfoId } } }, { new: true });
        } catch (error) {
            console.log(error);
        }
    }
    async removeCourses(userId: any, coursesId: any) : Promise<void>  {
        try {
             await userModel.findOneAndUpdate({ _id: userId },{ $pull: { courses:  { _id: coursesId } } }, { new: true });
        } catch (error) {
            console.log(error);
        }
    }
    async update(props: any) : Promise<void>  {
       try {
            await userModel.findOneAndUpdate({ _id: props.id }, props, { new: true });
       } catch (error) {
           console.log(error);
       }
    }
    async getAll(): Promise<any> {
        try{
            return await userModel.find().populate('resumes.template');
        }catch (error) {
            console.log(error);
        }
    }
    async getById(id: any): Promise<any> {
        try {
            return await userModel.findOne({ _id: id }).populate('resumes.template');
        } catch (error) {
            console.log(error);
        }
    }
    async getByEmail(email: string): Promise<any> {
        try {
            return await userModel.findOne({ email : email });
        } catch (error) {
            console.log(error);
        }
    }
    async getByIdAndToken(id: string, token: string): Promise<any> {
        try {
            return await userModel.findOne({ _id: id, token: token });
        } catch (error) {
            console.log(error);
        }
    }
    async getByCpfOrEmail(cpf: string, email: string): Promise<any> {
        try {
            return await userModel.findOne({
                $or: [
                        {   email: email   },
                        {   cpf : cpf }
                    ]
            });
        } catch (error) {
            console.log(error);
        }
    }


}
export default new UserService();