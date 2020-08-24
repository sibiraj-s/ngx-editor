const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const copyFile = async function (srcFilePath, destFilePath) {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/ngx-editor', destFilePath);
    await fs.promises.copyFile(srcPath, destPath);
    console.log(chalk.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(chalk.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('README.md', 'README.md');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
copyFile('LICENSE', 'LICENSE');
