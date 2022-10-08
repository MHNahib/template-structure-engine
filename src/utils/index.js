const fs = require("fs");

const generateDB = () => {
  const files = fs.readdirSync("./template");

  const subFiles = files.map((item) => fs.readdirSync(`./template/${item}`));

  // generate json
  const templateDB = subFiles.map((item, index) => {
    const dbStructure = {
      root: files[index],
      templates: item,
    };
    return dbStructure;
  });

  // save json
  fs.writeFile("db.json", JSON.stringify(templateDB), "utf8", function (err) {
    if (err) {
      console.log(err);
    }
    console.log("saved as db.json");
  });
};

const readJsonDB = () =>
  fs.readFile("db.json", (err, data) => {
    if (err) throw err;
    let db = JSON.parse(data);
    console.log(db);
  });

module.exports = { generateDB, readJsonDB };
