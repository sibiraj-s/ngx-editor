const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const copyFile = async function (srcFilePath, destFilePath) {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/ngx-editor', destFilePath);
    await fs.copyFile(srcPath, destPath);
    console.log(pc.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(pc.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('README.md', 'README.md');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
copyFile('LICENSE', 'LICENSE');
