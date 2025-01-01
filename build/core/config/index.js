let extension = '.js';
if (process.env.NODE_ENV == 'development')
    extension = '';
const fileName = `./${process.env.NODE_ENV}.env${extension}`;
module.exports = () => require(fileName);
