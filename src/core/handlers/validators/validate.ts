import Validator from 'validatorjs';

Validator.register('ageOver18', function(value, requirement, attribute) { 
    var today = new Date();
    return (today.getFullYear() - value) > 18;
  }, 'The :attribute is not over 18.');

export class Validate {

    public loginUser(data) {
        const rules = {
            login_email   : 'required|email',
            login_password: 'required'
        }
        return new Validator(data, rules);
    }

    public registerUser(data) {
        const rules = {
            'personalInfo.firstName' : 'required',
            'personalInfo.lastName'  : 'required',
            email                     : 'required|email',
            password                  : 'required',
            'personalInfo.birthDay.day'  : 'required|min:1|max:31',
            'personalInfo.birthDay.month': 'required|min:1|max:12',
            'personalInfo.birthDay.year' : 'required|ageOver18'
        }
        return new Validator(data, rules);
    }
}