'use strict';

const inquirer = require('inquirer');
const ghpages = require('gh-pages');
const packageJson = require('../package.json');

const ghPagesOptions = {
  branch: 'gh-pages',
  message: `update documentation for v${packageJson.version}`
}

inquirer.prompt([
  {
    name: 'publishDocs',
    type: 'confirm',
    message: `Do You want to publish the docs to '${ghPagesOptions.branch}' branch?`
  }
]).then(answers => {
  if (answers.publishDocs) {
    ghpages.publish('docs', ghPagesOptions, err => {
      if (err) {
        throw Error('Unable to publish docs. Error: ', err)
      }

      console.log('Documentation published successfully to `gh-pages`')
    })
  }
});
