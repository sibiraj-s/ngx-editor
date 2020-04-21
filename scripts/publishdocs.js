const util = require('util');

const inquirer = require('inquirer');
const ghpages = require('gh-pages');
const chalk = require('chalk');

const publishAsync = util.promisify(ghpages.publish);

const ghPagesOptions = {
  branch: 'gh-pages',
  message: `docs: update ${new Date().toISOString()}`
};

const questions = [
  {
    name: 'publishDocs',
    type: 'confirm',
    message: `Do You want to publish the docs to '${chalk.cyan(ghPagesOptions.branch)}' branch?`
  }
];

async function publish() {
  try {
    if (!process.env.CI) {
      const answers = await inquirer.prompt(questions);

      if (!answers.publishDocs) {
        return;
      }
    } else {
      console.log('CI detected. Skipping prompt.');
    }

    await publishAsync('docs', ghPagesOptions);
    console.log(chalk.green(`\nDocumentation published successfully to ${chalk.cyan('\'gh-pages\'')} \n`));
  } catch (err) {
    console.log(chalk.red('Unable to publish docs. Error:'), err);
  }
}

publish();
