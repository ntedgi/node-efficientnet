import * as fs from "fs";
import * as nodeFetch from "node-fetch";

import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
  EfficientNetModel,
  EfficientNetResult,
  EfficientNetLableLanguage,
  EfficientNetLanguageProvider
} from "./index";

const images = ["car.jpg", "panda.jpg", "fish.jpg"];
const imageDir = "./samples";
const imageDirRemoteUri =
  "https://raw.githubusercontent.com/ntedgi/node-EfficientNet/main/samples";

if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

async function download(image: string, cb: fs.NoParamCallback) {
  const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
  const buffer = await response.buffer();
  fs.writeFile(`${imageDir}/${image}`, buffer, cb);
}

//Default language results (English)
EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then((model: EfficientNetModel) => {
      images.forEach(async (image) => {
        await download(image, () => {
          model
              .inference(`${imageDir}/${image}`, { topK: 3 })
              .then((result: EfficientNetResult) => {
                console.log("Result in English : \n -------------------");
                console.log(result.result);
              });
        });
      });
    })
    .catch((e: Error) => {
      console.error(e);
    });

//Not default language results (Spanish)
EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then(async (model: EfficientNetModel) => {

      const labelLanguage = EfficientNetLableLanguage.SPANISH;
      const languageProvider = new EfficientNetLanguageProvider(labelLanguage);
      await languageProvider.load();

      images.forEach(async (image) => {
        await download(image, () => {
          model
              .inference(`${imageDir}/${image}`, { topK: 3 }, languageProvider)
              .then((result: EfficientNetResult) => {
                console.log("Result in Spanish : \n -------------------");
                console.log(result.result);
              });
        });
      });
    })
    .catch((e: Error) => {
      console.error(e);
    });
