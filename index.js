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
  // list of licenses to choose from
  {
    type: "list",
    name: "license",
    message: "which license would you like to use?",
    choices: [
      "Apache License 2.0",
      "GNU General Public License v3.0",
      "MIT License",
      "Unlicensed",
      "Other (add your own)",
    ],
  },
  // if user chooses "Other (add your own)", ask for the license
  {
    when: (answers) => answers.license === "Other (add your own)",
    type: "input",
    name: "license",
    message: "Please provide the license for your project.",
  },

  // confirm if the user wants to include their GitHub link
  {
    type: "confirm",
    name: "includeGitHub",
    message: "Would you like to include your GitHub Profile link?",
    default: true,
  },
  // if user wants to include their GitHub link, ask for their GitHub profile link
  {
    when: (answers) => answers.includeGitHub,
    type: "input",
    name: "gitHubLink",
    message: "Please provide your GitHub username.",
  },
  // confirm if the user wants to include their email address
  {
    type: "confirm",
    name: "includeEmail",
    message: "Would you like to include your email address?",
    default: true,
  },
  // if user wants to include their email address, ask for their email address
  {
    when: (answers) => answers.includeEmail,
    type: "input",
    name: "email",
    message: "Please provide your email address.",
  },
];

// create a function to generate the README
const generateReadme = (answers) => {
  let readme = `# ${answers.title}

`;
  // add license badge
  if (answers.license) {
    const licenseBadgeUrl = generateLicenseBadge(answers.license);
    readme += `![License](${licenseBadgeUrl})

`;
  }

  // add description section
  readme += `## Description

${answers.description}

`;

  // add table of contents section
  if (answers.includeTableOfContents) {
    readme += `## Table of Contents

`;
    if (answers.includeInstallation) {
      readme += `- [Installation](#installation)\n`;
    }

    if (answers.includeUsage) {
      readme += `- [Usage](#usage)\n`;
    }

    if (answers.includeContribution) {
      readme += `- [Contribution](#contribution)\n`;
    }

    if (answers.includeTest) {
      readme += `- [Test](#test)\n`;
    }

    if (answers.license) {
      readme += `- [License](#license)\n`;
    }

    readme += `- [Questions](#questions)\n`;

    readme += `\n`;
  }

  // add installation section
  if (answers.includeInstallation) {
    readme += `## Installation <a name="installation"></a>

${answers.installation}

`;
  }

  // add usage section
  if (answers.includeUsage) {
    readme += `## Usage <a name="usage"></a>

${answers.usage}

`;
  }

  // add contribution section
  if (answers.includeContribution) {
    readme += `## Contribution <a name="contribution"></a>

${answers.contribution}

`;
  }

  // add test section
  if (answers.includeTest) {
    readme += `## Test <a name="test"></a>

${answers.test}

`;
  }

  // add license section
  if (answers.license) {
    const licenseNotice = generateLicenseNotice(answers.license);
    readme += `## License <a name="license"></a>

${licenseNotice}

`;
  }

  // add questions section
  readme += `## Questions

`;

  // add email address
  if (answers.includeEmail) {
    const contactInstructions = generateContactInstructions(answers);
    readme += `${contactInstructions}

`;
  }
  // add GitHub username
  if (answers.gitHubLink) {
    const gitProfile = generateGitHubLink(answers.gitHubLink);
    readme += `GitHub: [${answers.gitHubLink}](${gitProfile})

`;
  }

  return readme;
};


// create a function to generate the license badge URL
const generateLicenseBadge = (license) => {
  const slug = license.replace(" ", "_").toLowerCase();
  return `https://img.shields.io/badge/license-${slug}-green`;
};

// create a function to generate the license notice
const generateLicenseNotice = (license) => {
  switch (license) {
    case "Apache License 2.0":
      return "This project is licensed under the Apache License 2.0.";
    case "MIT License":
      return "This project is licensed under the MIT License.";
    case "GNU General Public License v3.0":
      return "This project is licensed under the GNU General Public License v3.0.";
    case "Unlicensed":
      return "This project is in the public domain.";
    default:
      return `This project is licensed under the ${license}.`;
  }
};

// create a function to generate the GitHub profile URL
const generateGitHubLink = (username) => {
  return `https://github.com/${username}`;
};

// create a function to generate the contact instructions
const generateContactInstructions = (answers) => {
  return `To reach me with additional questions, please send an email to ${answers.email}.`;
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
