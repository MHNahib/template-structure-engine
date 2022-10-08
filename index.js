const fs = require("fs");
const readJsonDB = require("./read.json");
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

// for reading json
// readJsonDB();
