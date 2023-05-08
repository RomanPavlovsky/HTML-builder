const fs = require('fs');
const path = require('path');

const createBundle = async () => {
  let files = await fs.promises.readdir(path.resolve(__dirname, 'styles'), {
    withFileTypes: true,
  });
  let writeableStream = fs.createWriteStream(
    path.resolve(__dirname, './project-dist/bundle.css')
  );
  for (const file of files) {
    if (file.isFile() && path.extname(`${file.name}`) === '.css') {
      let readableStream = fs.createReadStream(
        path.resolve(__dirname, `./styles/${file.name}`)
      );
      readableStream.pipe(writeableStream, { end: false });
    }
  }
};
createBundle();
