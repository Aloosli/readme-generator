
import inquirer from 'inquirer';
import fs from 'fs';

  
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project.'
    },
    {
        type: 'confirm',
        name: 'includeTableOfContents',
        message: 'Would you like to include a table of contents?',
        default: true
    },

    {   when: (answers) => answers.includeTableOfContents,
        type: 'input',
        name: 'tableOfContents',
        message: 'Please provide a table of contents for your project.'
    },
    {
        type: 'confirm',
        name: 'includeUsage',
        message: 'Would you like to include usage information?',
        default: true
    },
    {
        when: (answers) => answers.includeUsage,
        type: 'input',
        name: 'usage',
        message: 'Please provide usage information for your project.'
    },
    {
        type: 'confirm',
        name: 'includeInstallation',
        message: 'Would you like to include installation instructions?',
        default: true
    },
    {   when: (answers) => answers.includeInstallation,
        type: 'input',
        name: 'installation', 
        message: 'Please provide installation instructions for your project.'
    },
    {
        type: 'confirm',
        name: 'includeContribution',
        message: 'Would you like to include contribution guidelines?',
        default: true
    },
    {   when: (answers) => answers.includeContribution,
        type: 'input',
        name: 'contribution',
        message: 'Please provide contribution guidelines for your project.'
    },
    {
        type: 'confirm',
        name: 'includeTest',
        message: 'Would you like to include test instructions?',
        default: true
    },
    {   when: (answers) => answers.includeTest,
        type: 'input',
        name: 'test',
        message: 'Please provide test instructions for your project.'
    },
    {
        type: 'confirm',
        name: 'includeLicense',
        message: 'Would you like to include a license?',
        default: true
    },
    {   when: (answers) => answers.includeLicense,
        type: 'input',
        name: 'license',
        message: 'Please provide a license for your project.'
    },
];

const generateReadme = (answers) => {
    return `# ${answers.title}

## Description

${answers.description}

## Table of Contents

${answers.tableOfContents}

## Usage

${answers.usage}

## Installation

${answers.installation}

## Contribution

${answers.contribution}

## Test

${answers.test}

## License

${answers.license}

`;
};

const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
        console.log('The README has been generated!');
    });
};

inquirer
    .prompt(questions)
    .then((answers) => {
        const readme = generateReadme(answers);
        writeToFile('README.md', readme);
    });
