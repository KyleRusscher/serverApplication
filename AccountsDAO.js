const mysql = require("mysql");
const util = require('util');

function getConnection() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mindy8109"
  });
  connection.connect(function(err) {
    if (err) throw err;
  });
  return connection;
}

async function query(sql, callback) {
    const connection = getConnection();
    const querys = util.promisify(connection.query).bind(connection);
    let data = await querys(sql);
    return data
}


module.exports.query = query;
