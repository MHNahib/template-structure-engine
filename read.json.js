const fs = require("fs");

const readJsonDB = () =>
  fs.readFile("db.json", (err, data) => {
    if (err) throw err;
    let db = JSON.parse(data);
    console.log(db);
  });

module.exports = readJsonDB;
