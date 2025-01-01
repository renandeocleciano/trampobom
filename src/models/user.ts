import mongoose from "mongoose"
import * as bcrypt from 'bcrypt';
import { JwtHandler } from '../core/handlers/jwt-handler';

function getDecimalNumber(val) {    return (val/1000); }
function setDecimalNumber(val) {    return (val*1000); }

var schema = mongoose.Schema({
    isPremium   : { type: Boolean, default: false },
    password    : { type: String, required: true },
    email       : { type: String, required: true },
    status      : { type: Boolean, default: true },
    token       : { type: String },
    aboutMe     : { type: String },
    hasPicture  : { type: Boolean, default: false },
    created_at  : { type: Date, default: Date.now },
    personalInfo: {
        firstName: { type: String, required: true },
        lastName : { type: String, required: true },
        cpf      : { type: String },
        birthDay : { 
			day  : { type: Number, required: true },
			month: { type: Number, required: true  },
			year : { type: Number, required: true } 
		},
    },
    residentialInfo: {
		cep         : { type: Number },
		place       : { type: String },
		number      : { type: Number },
		complement  : { type: String },
		neighborhood: { type: String },
		city        : { type: String },
		state       : { type: String }
    },
    schoolInfo: [
		{
			levelOrName: { type: String },
			institution: { type: String },
			start_date : { type: Date },
			end_date   : { type: Date },
			description: { type: String }
		}
	],
	courses: [
		{
			name       : { type: String },
			institution: { type: String },
			start_date : { type: Date },
			end_date   : { type: Date },
			description: { type: String }
		}
    ],
    professionalInfo: [
		{
			company     : { type: String },
			start_date  : { type: Date },
			end_date    : { type: Date },
			office      : { type: String },
			remuneration: { type: Number, default: 0, get: getDecimalNumber, set: setDecimalNumber },
			description : { type: String }
		}
    ],
    skills: [
		{
			skill : { type: String },
			rating: { type: Number }
		}
	],
    social: {
		facebook: { type: String },
		youtube : { type: String },
		github : { type: String },
		linkedin: { type: String },
		site    : { type: String },
    },
    resumes: [
        {
            template  : { type: mongoose.Schema.Types.ObjectId, ref: 'Templates' },
            downloaded: { type: Boolean, default: false },
        }
    ]
},
{
	toObject: { virtuals: true},
	toJSON  : { getters: true }
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});

schema.pre('findOneAndUpdate', function(next) {
    var user = this;
    if(user._update.password) {
        const salt = bcrypt.genSaltSync(10);
        user._update.password = bcrypt.hashSync(user._update.password, salt);
    }
	next();
});

schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = new JwtHandler().jwtSign(user._id);
    user.token = token;
    await user.save();
    return token;
}

schema.virtual('imgprofile').get(function () {
	if(this.hasPicture)
		return '/uploads/'+ this._id +'.webp';
	else
		return '/images/profile.jpg';
});

schema.virtual('lastJob').get(function () {
	if(!this.professionalInfo.length)
		return {
			remuneration : 0,
			office : '-'
		};
	return this.professionalInfo.slice(-1)[0];	
});

module.exports = mongoose.model('User', schema, 'User');