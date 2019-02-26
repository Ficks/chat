const config = require('./config/config.js');
const wrapper = require('co-mysql'),
    mysql = require('mysql'),
    pool = mysql.createPool(config.database),
    p = wrapper(pool);



module.exports = p;