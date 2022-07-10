const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(Server, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 5000
}