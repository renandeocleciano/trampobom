"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel = require('../models/user');
class UserService {
    add(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.create(props);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndRemove({ _id: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    removePet(userId, petId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $pull: { pets: petId } });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: props.id }, props, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUserPets(userId, petId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel.findOneAndUpdate({ _id: userId }, { $push: { pets: petId } });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.find().populate('resumes.template');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ _id: id }).populate('resumes.template');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ email: email });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getByIdAndToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({ _id: id, token: token });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getByCpfOrEmail(cpf, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel.findOne({
                    $or: [
                        { email: email },
                        { cpf: cpf }
                    ]
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new UserService();
