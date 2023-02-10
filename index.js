
import inquirer from 'inquirer';
import fs from 'fs';
console.log("readme gen running"); 

  
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
        type: 'input',
        name: 'table of contents',
        message: 'Please provide a table of contents for your project.'
    }
    {

        type: 'input',
        name: 'usage',
        message: 'Please provide usage information for your project.'
    },
    {
        type: 'input',
        name: 'installation', 
        message: 'Please provide installation instructions for your project.'
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please provide contribution guidelines for your project.'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide test instructions for your project.'
    },
    {
        type: 'input',
        name: 'license',
        message: 'Please provide a license for your project.'
    },
    
   
