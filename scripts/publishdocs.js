'use strict';

const inquirer = require('inquirer');
const ghpages = require('gh-pages');
const chalk = require('chalk');
const packageJson = require('../package.json');

const ghPagesOptions = {
  branch: 'gh-pages',
  message: `docs: ${packageJson.name} v${packageJson.version}`
};

inquirer.prompt([
  {
    name: 'publishDocs',
    type: 'confirm',
    message: `Do You want to publish the docs to '${chalk.cyan(ghPagesOptions.branch)}' branch?`
  }
]).then((answers) => {
  if (answers.publishDocs) {
    ghpages.publish('docs', ghPagesOptions, (err) => {
      if (err) {
        chalk.red('Unable to publish docs. Error: ', err);
        return;
      }
      console.log(chalk.green(`\nDocumentation published successfully to ${chalk.cyan('\'gh-pages\'')} \n`));
    });
  }
});
