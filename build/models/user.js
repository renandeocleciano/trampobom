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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const jwt_handler_1 = require("../core/handlers/jwt-handler");
const javascript_time_ago_1 = __importDefault(require("javascript-time-ago"));
const pt_1 = __importDefault(require("javascript-time-ago/locale/pt"));
function getDecimalNumber(val) { return (val / 1000); }
function setDecimalNumber(val) { return (val * 1000); }
var schema = mongoose_1.default.Schema({
    isPremium: { type: Boolean, default: false },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, default: true },
    token: { type: String },
    aboutMe: { type: String },
    hasPicture: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    personalInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        cpf: { type: String },
        birthDay: { type: Date },
    },
    residentialInfo: {
        cep: { type: Number },
        place: { type: String },
        number: { type: Number },
        complement: { type: String },
        neighborhood: { type: String },
        city: { type: String },
        state: { type: String }
    },
    schoolInfo: [
        {
            level: { type: String },
            institution: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            description: { type: String }
        }
    ],
    professionalInfo: [
        {
            company: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            office: { type: String },
            remuneration: { type: Number, default: 0, get: getDecimalNumber, set: setDecimalNumber },
            description: { type: String }
        }
    ],
    skills: [
        {
            skill: { type: String },
            rating: { type: Number }
        }
    ],
    social: {
        facebook: { type: String },
        twiiter: { type: String },
        gplus: { type: String },
        linkedin: { type: String },
        site: { type: String },
    },
    resumes: [
        {
            template: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Templates' },
            downloaded: { type: Boolean, default: false },
        }
    ]
}, {
    toJSON: { getters: true }
});
schema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
});
schema.pre('findOneAndUpdate', function (next) {
    var user = this;
    if (user._update.password) {
        const salt = bcrypt.genSaltSync(10);
        user._update.password = bcrypt.hashSync(user._update.password, salt);
    }
    next();
});
schema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = new jwt_handler_1.JwtHandler().jwtSign(user._id);
        user.token = token;
        yield user.save();
        return token;
    });
};
schema.virtual('bithDay_formated').get(function () {
    javascript_time_ago_1.default.addLocale(pt_1.default);
    const timeAgo = new javascript_time_ago_1.default('pt');
    return timeAgo.format(this.personalInfo.birthDay);
});
schema.virtual('imgprofile').get(function () {
    if (this.hasPicture)
        return '/images/uploads/users/' + this._id + '.webp';
    else
        return '/images/profile.jpg';
});
schema.virtual('lastJob').get(function () {
    if (!this.professionalInfo.length)
        return {
            remuneration: 0,
            office: '-'
        };
    return this.professionalInfo.slice(-1)[0];
});
module.exports = mongoose_1.default.model('User', schema, 'User');
