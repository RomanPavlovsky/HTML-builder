const fs = require('fs');
const path = require('path');

const createBuild = async () => {
  // create dirs
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist/assets'), {
    recursive: true,
  });
  // create bundle css
  let cssFiles = await fs.promises.readdir(path.resolve(__dirname, 'styles'), {
    withFileTypes: true,
  });
  let writeableCssStream = fs.createWriteStream(
    path.resolve(__dirname, 'project-dist/style.css')
  );
  for (const file of cssFiles) {
    if (file.isFile() && path.extname(`${file.name}`) === '.css') {
      let readableStream = fs.createReadStream(
        path.resolve(__dirname, `styles/${file.name}`)
      );
      readableStream.pipe(writeableCssStream, { end: false });
    }
  }
  // copy assets
  const copyAssets = async (folder = '') => {
    let files = await fs.promises.readdir(
      path.resolve(__dirname, `assets/${folder}`),
      {
        withFileTypes: true,
      }
    );
    for (const element of files) {
      if (element.isFile()) {
        await fs.promises.copyFile(
          path.resolve(__dirname, `assets/${folder}`, element.name),
          path.resolve(__dirname, `project-dist/assets/${folder}`, element.name)
        );
      } else {
        await fs.promises.mkdir(
          path.resolve(__dirname, `project-dist/assets/${element.name}`),
          {
            recursive: true,
          }
        );
        await copyAssets(element.name);
      }
    }
  };
  await copyAssets();
  // create index.html
  let htmlFiles = await fs.promises.readdir(
    path.resolve(__dirname, 'components'),
    {
      withFileTypes: true,
    }
  );
  let template = await fs.promises.readFile(
    path.resolve(__dirname, 'template.html')
  );
  for (const file of htmlFiles) {
    const fileExt = path.extname(`${file.name}`);
    const fileName = path.basename(`${file.name}`, `${fileExt}`);
    if (template.includes(`{{${fileName}}}`)) {
      let component = await fs.promises.readFile(
        path.resolve(__dirname, `components/${file.name}`)
      );
      template = template.toString().replace(`{{${fileName}}}`, `${component}`);
    }
  }
  let writeableHtmlStream = fs.createWriteStream(
    path.resolve(__dirname, 'project-dist/index.html')
  );
  writeableHtmlStream.write(template);
};

createBuild();
