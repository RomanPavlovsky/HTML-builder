const fs = require('fs');
const path = require('path');

const copyDir = async () => {
  console.log(path.resolve(__dirname, 'files-copy'));
  await fs.promises.mkdir(path.resolve(__dirname, 'files-copy'), {
    recursive: true,
  });
  let copyFiles = await fs.promises.readdir(
    path.resolve(__dirname, 'files-copy')
  );
  for (const file of copyFiles) {
    await fs.promises.unlink(path.resolve(__dirname, 'files-copy', file));
  }
  let sourceFiles = await fs.promises.readdir(path.resolve(__dirname, 'files'));
  for (const file of sourceFiles) {
    await fs.promises.copyFile(
      path.resolve(__dirname, 'files', file),
      path.resolve(__dirname, 'files-copy', file)
    );
  }
};

copyDir();
