const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");

const { readJsonDB } = require("./index");
const qa = async () => {
  const db = [...readJsonDB()];

  const roots = db.map((item) => item.root);
  const chooseDB = await inquirer
    .prompt([
      {
        type: "list",
        name: "db",
        message: "Choose your own database:",
        choices: [...roots],
      },
    ])
    .then((answers) => answers.db);

  const templates = db.filter((item) => item.templates);

  //   console.log(templates[0].templates);
  const module = await inquirer
    .prompt([
      {
        type: "list",
        name: "module",
        message: "Choose your own database:",
        choices: [...templates[0].templates],
      },
    ])
    .then((answers) => answers.module);

  console.log("module: ", module);

  if (module) {
    const spinner = createSpinner("Processing...").start();
    setTimeout(() => {
      spinner.success();
    }, 1000);
  }
  //   console.log(chooseDB);
};

module.exports = qa;
