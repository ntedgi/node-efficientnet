import * as fs from "fs";
import * as nodeFetch from "node-fetch";

import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
  EfficientNetModel,
  EfficientNetResult,
} from "./index";

const images = ["car.jpg", "panda.jpg", "fish.jpg"];
const imageDir = "./samples";
const imageDirRemoteUri =
  "https://raw.githubusercontent.com/ntedgi/node-EfficientNet/main/samples";

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

async function download(image: string, cb: fs.NoParamCallback) {
  const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
  const buffer = await response.buffer();
  fs.writeFile(`${imageDir}/${image}`, buffer, cb);
}

EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B7)
  .then((model: EfficientNetModel) => {
    images.forEach(async (image) => {
      await download(image, () => {
        model
          .inference(`${imageDir}/${image}`, 3)
          .then((result: EfficientNetResult) => {
            console.log(result.result);
          });
      });
    });
  })
  .catch((e: Error) => {
    console.error(e);
  });
