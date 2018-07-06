const mysql = require('mysql');

//creating a mysql pool for the a shared instance of db connection in whole application
var connection = mysql.createPool({
   host: 'localhost',
   user: 'niftyUser',
   password: 'carinonotuse',
   database: 'niftyhub'
});
console.log('Connection is created!!!');

module.exports = connection;