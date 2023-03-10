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
  // confirm if user wants to include a screenshot
  {
    type: "confirm",
    name: "includeScreenshot",
    message: "Would you like to include a screenshot?",
    default: true,
  },
  {
    when: (answers) => answers.includeScreenshot,
    type: "input",
    name: "screenshotLink",
    message: "Please provide a link to the screenshot.",
    validate: function (value) {
      if (value.trim().length > 0) {
        return true;
      } else {
        return "Please enter a valid link to the screenshot.";
      }
    },
  },
  // confirm if user wants to include a video
  {
    type: "confirm",
    name: "includeVideo",
    message: "Would you like to include a video?",
    default: true,
  },
  {
    when: (answers) => answers.includeVideo,
    type: "input",
    name: "videoLink",
    message: "Please provide a Youtube link to the video.",
    validate: function (value) {
      if (value.trim().length > 0) {
        return true;
      } else {
        return "Please enter a valid link to the video.";
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
    when: (answers) => answers.includeLicense,
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
  // list of colors to choose from for the license badge
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
  // destructure the answers object
  const {
    title,
    description,
    includeScreenshot,
    includeVideo,
    videoLink,
    license,
    badgeColor,
    gitHubLink,
    includeTableOfContents,
    includeInstallation,
    includeUsage,
    includeContribution,
    includeTest,
    includeGitHub,
    includeEmail,
  } = answers;
  // initialize the readme variable
  let readme = `# ${title}\n\n`;
  // if user wants to include a license, add the license badge

  if (license) {
    readme += `![License](${generateLicenseBadge(
      license,
      badgeColor || "brightgreen"
    )})\n\n`;
  }
  // add the description

  readme += `## Description\n\n${description}\n\n`;
  // add the screenshot 

  if (includeScreenshot) {
    readme += `## Screenshot\n\n`;
    readme += `![screenshot](${answers.screenshotLink})\n\n`;
  }
  // add the video
  if (includeVideo) {
    readme += `## Video\n\n`;
    readme += `Click the video thumbnail to open it in a new tab.\n\n`;
    readme += `[![Demo Video](${generateVideoThumbnail(
      videoLink
    )})](${videoLink})\n\n`;
  }
  // add the table of contents

  if (includeTableOfContents) {
    const tableOfContents = [];

    if (includeInstallation) {
      tableOfContents.push({ name: "Installation", link: "#installation" });
    }
    if (includeUsage) {
      tableOfContents.push({ name: "Usage", link: "#usage" });
    }
    if (includeContribution) {
      tableOfContents.push({ name: "Contribution", link: "#contribution" });
    }
    if (includeTest) {
      tableOfContents.push({ name: "Test", link: "#test" });
    }
    if (license) {
      tableOfContents.push({ name: "License", link: "#license" });
    }
    if (includeGitHub || includeEmail) {
      tableOfContents.push({ name: "Questions", link: "#questions" });
    }
    // add the table of contents to the readme

    readme += `## Table of Contents\n\n`;
    
    // loop through the table of contents array and add each section to the readme
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
      readme += `${generateContactInstructions(answers)}\n\n`;
    }

    if (includeGitHub) {
      readme += `GitHub: [${gitHubLink}](${generateGitHubLink(
        gitHubLink
      )})\n\n`;
    }

    readme += `---\n\n`;
  }
  // add the return to table of contents link
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
// create a function to generate the video thumbnail URL
//--------------------------------------------
function generateVideoThumbnail(videoLink) {
  const videoId = getVideoIdFromLink(videoLink);
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
// create a function to extract the video ID from the video link
//--------------------------------------------
function getVideoIdFromLink(videoLink) {
  const videoIdRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
  const matches = videoLink.match(videoIdRegex);
  return matches ? matches[1] : "";
}
// create a function to initialize the application and save the readme file
//--------------------------------------------
inquirer.prompt(questions).then((answers) => {
  if (!answers.includeLicense) {
    answers.license = "";
  }
  // generate the readme content
  const readme = generateReadme(answers);
  // write the readme content to a file
  fs.writeFile("README.md", readme, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("The README has been generated!");
  });
});

