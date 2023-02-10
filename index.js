// import needed modules
import inquirer from "inquirer";
import fs from "fs";

// create questions objects
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Please provide a description of your project.",
  },
  // confirm if user wants to include a table of contents
  {
    type: "confirm",
    name: "includeTableOfContents",
    message: "Would you like to include a table of contents?",
    default: true,
  },
  // if user wants to include a table of contents, ask for the table of contents
  {
    when: (answers) => answers.includeTableOfContents,
    type: "input",
    name: "tableOfContents",
    message: "Please provide a table of contents for your project.",
  },
  // confirm if user wants to include usage information
  {
    type: "confirm",
    name: "includeUsage",
    message: "Would you like to include usage information?",
    default: true,
  },
  // if user wants to include usage information, ask for the usage information
  {
    when: (answers) => answers.includeUsage,
    type: "input",
    name: "usage",
    message: "Please provide usage information for your project.",
  },
  // confirm if user wants to include installation instructions
  {
    type: "confirm",
    name: "includeInstallation",
    message: "Would you like to include installation instructions?",
    default: true,
  },
  // if user wants to include installation instructions, ask for the installation instructions
  {
    when: (answers) => answers.includeInstallation,
    type: "input",
    name: "installation",
    message: "Please provide installation instructions for your project.",
  },
  // confirm if user wants to include contribution guidelines
  {
    type: "confirm",
    name: "includeContribution",
    message: "Would you like to include contribution guidelines?",
    default: true,
  },
  // if user wants to include contribution guidelines, ask for the contribution guidelines
  {
    when: (answers) => answers.includeContribution,
    type: "input",
    name: "contribution",
    message: "Please provide contribution guidelines for your project.",
  },
  // confirm if user wants to include test instructions
  {
    type: "confirm",
    name: "includeTest",
    message: "Would you like to include test instructions?",
    default: true,
  },
  // if user wants to include test instructions, ask for the test instructions
  {
    when: (answers) => answers.includeTest,
    type: "input",
    name: "test",
    message: "Please provide test instructions for your project.",
  },
  // confirm if user wants to include a license
  {
    type: "confirm",
    name: "includeLicense",
    message: "Would you like to include a license?",
    default: true,
  },
  // if user wants to include a license, ask for the license
  {
    when: (answers) => answers.includeLicense,
    type: "input",
    name: "license",
    message: "Please provide a license for your project.",
  },
];
// create a function to generate the README
const generateReadme = (answers) => {
  let readme = `# ${answers.title}

## Description

${answers.description}

`;

  // if statements to check if user wants to include a table of contents, usage information, installation instructions, contribution guidelines, test instructions, or a license

  if (answers.includeTableOfContents) {
    readme += `## Table of Contents

${answers.tableOfContents}

`;
  }

  if (answers.includeUsage) {
    readme += `## Usage

${answers.usage}

`;
  }

  if (answers.includeInstallation) {
    readme += `## Installation

${answers.installation}

`;
  }

  if (answers.includeContribution) {
    readme += `## Contribution

${answers.contribution}

`;
  }

  if (answers.includeTest) {
    readme += `## Test

${answers.test}

`;
  }

  if (answers.includeLicense) {
    readme += `## License

${answers.license}

`;
  }

  return readme;
};
// create a function to save the README
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("The README has been generated!");
  });
};
// call the inquirer module to prompt the user
inquirer.prompt(questions).then((answers) => {
  const readme = generateReadme(answers);
  writeToFile("README.md", readme);
});
