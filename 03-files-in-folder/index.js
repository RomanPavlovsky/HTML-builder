const fs = require('fs');
const path = require('path');

fs.promises
  .readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true })
  .then((value) => {
    value.forEach((elem) => {
      if (elem.isFile()) {
        const fileExt = path.extname(`${elem.name}`);
        const fileName = path.basename(`${elem.name}`, `${fileExt}`);
        fs.promises
          .stat(path.resolve(__dirname, 'secret-folder', elem.name))
          .then((file) =>
            console.log(
              `${fileName} - ${fileExt.slice(1)} - ${file.size} byte(s)`
            )
          );
      }
    });
  });
