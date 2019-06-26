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
    let x = await querys(sql);
    return x
    // (async () => {
    //   try {
        
    //   } finally {
    //     connection.end()
    //   }
    // })()


    
//     const connection = getConnection();
//   connection.promise().query(sql)
//   .then(([rows, fields]) => {
//     if (rows == 0) {
//         console.log("Non esiste!")
//         return res.send(JSON.stringify({ "status": 500, "response": "codeNotExist" }));
//     }
// })


}


module.exports.query = query;
