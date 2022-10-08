#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");

const { readJsonDB, moveFile } = require("./index");

const loadingLog = async (msg, time = 100) => {
  const spinner = createSpinner(msg).start();
  await sleep(time);
  spinner.success();
  return true;
};

const sleep = (time = 1000) => new Promise((r) => setTimeout(r, time));

const runCommand = (command) => {
  try {
    execSync(`${command}`, { sudo: "inherit" });
    return true;
  } catch (err) {
    console.log(`Failed to execute ${command}`, err);
    return false;
  }
};

const qa = async () => {
  // qa
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
    // const spinner = createSpinner("Processing...").start();
    // setTimeout(() => {
    //   spinner.success();
    // }, 1000);
    await loadingLog(" Processing...");
  }

  // cli engine

  const repoName = process.argv[2] || "express-db-boilerplate";
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/MHNahib/test-cli-engine.git ${repoName} && mkdir ${repoName}-1 && cp -r ./${repoName}/template/${chooseDB}/${module}/* ./${repoName}-1 && rm -r ./${repoName} && mv ${repoName}-1 ${repoName} && rm -r bin .git .gitignore src node_modules index.js db.json package-lock.json package.json && cd ${repoName} && npm i`;
  // const installDepsCom = `cd ${repoName} && npm install`;
  // const removeTemplateFileCommands = `cd ${repoName} && rm -r bin .git`;

  //   console.log(`Cloning the repository with the name ${repoName}`);
  const cloning = loadingLog(
    `Creating the repository with the name ${repoName}`,
    3000
  );
  const checkout = runCommand(gitCheckoutCommand);

  if (!checkout) process.exit(-1);
};

module.exports = qa;
