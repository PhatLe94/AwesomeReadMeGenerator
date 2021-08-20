//Including / requiring external packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// Internal modules
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// Inquirer prompts for userResponses
const questions = [
  {
    type: "input",
    message: "What is your GitHub username? (No @ needed)",
    name: "username",
    default: "PhatLe94",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid GitHub username is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the name of your GitHub repo?",
    name: "repo",
    default: "ReadMe-Generator",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid GitHub repo is required");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
    default: "Project Title",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid project title is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Write a description of your project.",
    name: "description",
    default: "Project Description",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid project description is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message:
      "If applicable, describe the steps required to install your project for the Installation section.",
    name: "installation",
  },
  {
    type: "input",
    message:
      "Provide instructions and examples of your project in use for the Usage section.",
    name: "usage",
  },
  {
    type: "input",
    message:
      "If applicable, provide guidelines on how other developers can contribute to your project.",
    name: "contributing",
  },
  {
    type: "input",
    message:
      "If applicable, provide any tests written for your application and provide examples on how to run them.",
    name: "tests",
  },
  {
    type: "list",
    message: "Choose a license for your project.",
    choices: [
      "Academic Free License v3.0",
      "Apache license 2.0",
      "Artistic license 2.0",
      "Boost Software License 1.0",
      "BSD 2-clause Simplified license",
      "BSD 3-clause New or Revised license",
      "BBSD 3-clause Clear license",
      "Creative Commons license family",
      "Creative Commons Zero v1.0 Universal",
      "Creative Commons Attribution 4.0",
      "Creative Commons Attribution Share Alike 4.0",
      "Do What The F*ck You Want To Public License",
      "Educational Community License v2.0",
      "Eclipse Public License 1.0",
      "Eclipse Public License 2.0",
      "European Union Public License 1.1",
      "GNU Affero General Public License v3.0",
      "GNU General Public License family",
      "GNU General Public License v2.0",
      "GNU General Public License v3.0",
      "GNU Lesser General Public License family",
      "GNU Lesser General Public License v2.1",
      "GNU Lesser General Public License v3.0",
      "ISC",
      "LaTeX Project Public License v1.3c",
      "Microsoft Public License",
      "MIT License",
      "Mozilla Public License 2.0",
      "Open Software License 3.0",
      "PostgreSQL License",
      "SIL Open Font License 1.1",
      "University of Illinois/NCSA Open Source License",
      "The Unlicense",
      "zLib License",
    ],
    name: "license",
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Awesome! Your README.md file has been generated");
  });
}

const writeFileAsync = util.promisify(writeToFile);

// Main function
async function init() {
  try {
    // Prompt Inquirer questions
    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log("Awesome! Fetching your GitHub data next...");

    // Call GitHub api for user info
    const userInfo = await api.getUser(userResponses);
    console.log("Your GitHub user info: ", userInfo);

    // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
    console.log("Generating your Awesome README next...");
    const markdown = generateMarkdown(userResponses, userInfo);
    console.log(markdown);

    // Write markdown to file
    await writeFileAsync("ExampleREADME.md", markdown);
  } catch (error) {
    console.log(error);
  }
}

init();
