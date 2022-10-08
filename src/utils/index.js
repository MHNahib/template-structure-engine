const fs = require("fs");
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { sudo: "inherit" });
    return true;
  } catch (err) {
    console.log(`Failed to execute ${command}`, err);
    return false;
  }
};

const generateDB = () => {
  const repoName = "boilerplate";
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/MHNahib/test-cli-engine.git ${repoName}`;

  console.log(`Cloning the repository with the name ${repoName}`);
  const checkout = runCommand(gitCheckoutCommand);
  if (!checkout) process.exit(-1);

  const files = fs.readdirSync("./boilerplate/template");

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
    // remove boilarplate
    removeBoilarplate(repoName);
  });
};

const removeBoilarplate = (folder) => {
  fs.rm(`./${folder}`, { recursive: true }, () => console.log("done"));
};

const readJsonDB = () => {
  const data = fs.readFileSync("db.json", (err) => {
    if (err) throw err;
  });
  let db = JSON.parse(data);
  // console.log(db);
  return db;
};

module.exports = { generateDB, readJsonDB };
