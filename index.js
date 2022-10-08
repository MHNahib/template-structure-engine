const fs = require("fs");
const files = fs.readdirSync("./template");

const subFiles = files.map((item) => fs.readdirSync(`./template/${item}`));

// const templateDB = {};
const templateDB = subFiles.map((item, index) => {
  const dbStructure = {
    root: files[index],
    templates: item,
  };
  return dbStructure;
});
// const templateDB=subFiles.map((item, index) => {
//   const dbStructure = {
//     root: files[index],
//     templates: item,
//   };

// });
console.log(templateDB);

fs.writeFile("db.json", JSON.stringify(templateDB), "utf8", function (err) {
  if (err) {
    console.log(err);
  }
  console.log("saved");
});
