var mysql = require('mysql');

// create another db_login file like
//                db_login_[onid].js 
//                gitignore will shouldn't commit your credentials 
//                and in the db flask, just load in your db_login :)

var onid = "myonid";
var password = "password"

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "classmysql.engr.oregonstate.edu",
    user: "cs340_"+onid,
    password: password,
    database: "cs340_"+onid
  });
  module.exports.pool = pool;