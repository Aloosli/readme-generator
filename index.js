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
  {
    type: "list",
    name: "badgeColor",
    message: "What color would you like the license badge to be?",
    choices: ["brightgreen", "green", "yellowgreen", "yellow", "orange", "red", "blue", "lightgrey", "success", "important", "critical", "informational", "inactive"],
    default: "brightgreen"
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
    const tableOfContents = [
      { name: "Installation", link: "#installation" },
      { name: "Usage", link: "#usage" },
      { name: "Contribution", link: "#contribution" },
      { name: "Test", link: "#test" },
      { name: "License", link: "#license" },
      { name: "Questions", link: "#questions" },
    ];
    readme += `## Table of Contents

`;
    tableOfContents.slice(1).forEach((section) => {
      readme += `- [${section.name}](${section.link})

`;
    });
  }

  // add installation section
  if (answers.includeInstallation) {
    readme += `## Installation

${answers.installation}

`;
  }

  // add usage section
  if (answers.includeUsage) {
    readme += `## Usage

${answers.usage}

`;
  }

  // add contribution section
  if (answers.includeContribution) {
    readme += `## Contribution

${answers.contribution}

`;
  }

  // add test section
  if (answers.includeTest) {
    readme += `## Test

${answers.test}

`;
  }

  // add license section
  if (answers.license) {
    const licenseNotice = generateLicenseNotice(answers.license, answers.badgeColor);
    readme += `## License

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

  // add link to Table of Contents at the bottom of README
  
  if (answers.includeTableOfContents) {
    readme += `Return to [Table of Contents](#table-of-contents)
`;
  }


  return readme;
};

// create a function to generate the license badge URL
const generateLicenseBadge = (license, badgeColor) => {
  const slug = license.replace(" ", "_").toLowerCase();
  return `https://img.shields.io/badge/license-${slug}-${BadgeColor}.svg`;
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
  const licenseBadgeUrl = generateLicenseBadge(data.license, data.badgeColor || "brightgreen");
  const content = generateReadme(data);
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
