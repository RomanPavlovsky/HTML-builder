const fs = require('fs');
const path = require('path');

const showFiles = async () => {
  let files = await fs.promises.readdir(
    path.resolve(__dirname, 'secret-folder'),
    { withFileTypes: true }
  );
  for (const elem of files) {
    if (elem.isFile()) {
      const fileExt = path.extname(`${elem.name}`);
      const fileName = path.basename(`${elem.name}`, `${fileExt}`);
      let file = await fs.promises.stat(
        path.resolve(__dirname, 'secret-folder', elem.name)
      );
      console.log(`${fileName} - ${fileExt.slice(1)} - ${file.size} byte(s)`);
    }
  }
};
showFiles();
