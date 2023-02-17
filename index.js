// import needed modules
import inquirer from "inquirer";
import fs from "fs";

// create questions objects
//--------------------------------------------
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: function (value) {
      if (value.trim().length > 0) {
        return true;
      } else {
        return "Please enter a  title.";
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Please provide a description of your project.",
    validate: function (value) {
      if (value.trim().length > 0) {
        return true;
      } else {
        return "Please enter a  description.";
      }
    },
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
    ],
  },
  {
    type: "list",
    name: "badgeColor",
    message: "What color would you like the license badge to be?",
    choices: [
      "brightgreen",
      "green",
      "yellowgreen",
      "yellow",
      "orange",
      "red",
      "blue",
      "lightgrey",
    ],
    default: "brightgreen",
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
// end of questions array
//--------------------------------------------
// function to generate the README content based on user's answers
//--------------------------------------------
function generateReadme(answers) {
  const {
    title,
    description,
    license,
    badgeColor,
    gitHubLink,
    email,
    includeTableOfContents,
    includeInstallation,
    includeUsage,
    includeContribution,
    includeTest,
    includeGitHub,
    includeEmail,
  } = answers;

  let readme = `# ${title}\n\n`;

  if (license) {
    readme += `![License](${generateLicenseBadge(
      license,
      badgeColor || "brightgreen"
    )})\n\n`;
  }

  readme += `## Description\n\n${description}\n\n`;

  if (includeTableOfContents) {
    const tableOfContents = [
      { name: "Installation", link: "#installation" },
      { name: "Usage", link: "#usage" },
      { name: "Contribution", link: "#contribution" },
      { name: "Test", link: "#test" },
      { name: "License", link: "#license" },
    ];
    
    readme += `## Table of Contents\n\n`;
    
    tableOfContents.forEach((section) => {
      readme += `- [${section.name}](${section.link})\n\n`;
    });
}


  if (includeInstallation) {
    readme += `## Installation\n\n${answers.installation}\n\n`;
  }

  if (includeUsage) {
    readme += `## Usage\n\n${answers.usage}\n\n`;
  }

  if (includeContribution) {
    readme += `## Contribution\n\n${answers.contribution}\n\n`;
  }

  if (includeTest) {
    readme += `## Test\n\n${answers.test}\n\n`;
  }

  if (license) {
    readme += `## License\n\n${generateLicenseNotice(license)}\n\n`;
  }

  if (includeGitHub || includeEmail) {
    readme += `## Questions\n\n`;

    if (includeEmail) {
      readme += `${generateContactInstructions(email)}\n\n`;
    }

    if (includeGitHub) {
      readme += `GitHub: [${gitHubLink}](${generateGitHubLink(
        gitHubLink
      )})\n\n`;
    }
  }

  if (includeTableOfContents) {
    readme += `Return to [Table of Contents](#table-of-contents)\n\n`;
  }

  return readme;
}

// create a function to generate the license badge URL
//--------------------------------------------
const generateLicenseBadge = (license, badgeColor) => {
  // replace spaces with underscores
  const slug = license.toLowerCase().replace(/ /g, "_");

  // return the badge URL
  return `https://img.shields.io/badge/license-${slug}-${badgeColor}.svg`;
};

// create a function to generate the license notice
//--------------------------------------------
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
//--------------------------------------------
const generateGitHubLink = (username) => {
  return `https://github.com/${username}`;
};

// create a function to generate the contact instructions
//--------------------------------------------
const generateContactInstructions = (answers) => {
  return `To reach me with additional questions, please send an email to ${answers.email}.`;
};

// create a function to save the README to a file
//--------------------------------------------
const writeToFile = (fileName, answers) => {
  const content = generateReadme(answers);
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("The README has been generated!");
  });
};

// call the inquirer module to prompt the user
//--------------------------------------------
inquirer.prompt(questions).then((answers) => {
  if (!answers.includeLicense) {
    answers.license = "";
  }

  const readme = generateReadme(answers);
  writeToFile("README.md", answers);
});
