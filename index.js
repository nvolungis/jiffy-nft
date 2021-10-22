const jimp = require("jimp");
const fs = require("fs");

const BASE_DIR = "./inputs";

const getFolderMetadata = (folder) => {
  const [name, width, height] = folder.split("_");

  return {
    name,
    width: width.replace("w", ""),
    height: height.replace("h", ""),
  };
};

const readDir = (path) =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

const getImageMetadata = (file) => {
  const [,prefix] = file.split(".");
  const [, , , image] = prefix.split("/");
  const [part, version, x, y] = image.split("_");

  return {
    part,
    version: version.replace("v", ""),
    x: Number(x.replace("x", "")),
    y: Number(y.replace("y", "")),
  };
};

const loadImage = async (file) => {
  const metadata = getImageMetadata(file);
  const loadedFile = await jimp.read(file);
  return {
    ...metadata,
    loadedFile
  };
};

const getPermutations = (things) => {
  const permutations = [];
  const permutate = (list, acc, current = []) => {
    const [head,...rest] = list;

    if (rest.length === 0) {
      head.forEach(item => {
        acc.push([...current, item])
      })
    } else {
      head.forEach(item => {
        permutate(rest, acc, [...current, item]);
      });
    }
  };

  permutate(things, permutations);

  return permutations;
};

const groupParts = (images) => {
  const grouped = images.reduce((memo, image) => {
    if (!memo[image.part]) {
      memo[image.part] = [image];
    } else {
      memo[image.part].push(image);
    }

    return memo;
  }, {});

  return Object.values(grouped);
};

const processFolder = async (folder) => {
  const { name, width, height } = getFolderMetadata(folder);
  const imageNames = await readDir(`${BASE_DIR}/${folder}`);
  const images = await Promise.all(
    imageNames.map((file) => loadImage(`${BASE_DIR}/${folder}/${file}`))
  );

  const permutations = getPermutations(groupParts(images));

  permutations.forEach(async (parts) => {
    const backgroundImage = await new jimp(width, height, 0x0);

    let path = [];
    parts.forEach(({x, y, part, version, loadedFile }) => {
      backgroundImage.composite(loadedFile, x, y);
      path.push(`${part}${version}`);
    });

    backgroundImage.write(`./output/${name}/${path.join('_')}.png`);
  });
};

const process = async () => {
  fs.readdir(BASE_DIR, (err, folders) => {
    folders.forEach((folder) => {
      if (folder !== '.DS_Store') {
        processFolder(folder);
      }
    });
  });
};

process();
