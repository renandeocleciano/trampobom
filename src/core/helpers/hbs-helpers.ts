const datetimeDiff = require('./datediff');

module.exports = {
    showDateDif: (options) => {
        const from = options.hash.s;
        var to = options.hash.e;
        var text = `${from.getMonth()+1}/${from.getFullYear()}`;
        if(to !== null) {
            text += ` - ${to.getMonth()+1}/${to.getFullYear()} `;
        }else {
            text += ' - atual ';
            to = new Date();
        }
        const diff = datetimeDiff(from, to); 
        if(diff.years > 0 && diff.months > 0) 
            text +=`(${diff.years} ano(s) e ${diff.years} mes(es))`;
        if(diff.years > 0)
            text += `(${diff.years} ano(s))`;
        if(diff.months > 0)
            text += `(${diff.months} mes(es))`;
        
        return text;
    },
    showMonthAndYear:  (options) => {
        const from = options.hash.s;
        var to = options.hash.e;
        return `${from.getMonth()+1}/${from.getFullYear()} - ${to.getMonth()+1}/${to.getFullYear()}`;
    }
}