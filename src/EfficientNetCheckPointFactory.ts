import * as tf from "@tensorflow/tfjs-node-gpu";
import { io } from "@tensorflow/tfjs-core";

import EfficientNetModel from "./EfficientnetModel";
import { EfficientNetCheckPoint } from "./EfficientNetCheckPoint";
import { EfficientNetLableLanguage } from './EfficientNetLanguageProvider'
const defaultModelsUrl =
  "https://raw.githubusercontent.com/ntedgi/efficientnet-tensorflowjs-binaries/main/models/B";
const modelFileName = "model.json";
const inputLayerImageSize = [224, 240, 260, 300, 380, 456, 528, 600];

interface EfficientNetCheckPointFactoryOptions {
  localModelRootDirectory?: string;
  locale?: EfficientNetLableLanguage;
}

export default class EfficientNetCheckPointFactory {
  static async create(
    checkPoint: EfficientNetCheckPoint,
    options?: EfficientNetCheckPointFactoryOptions
  ): Promise<EfficientNetModel> {
    const { localModelRootDirectory, locale } = options || {};
    let modelPath:
      | string
      | io.IOHandler = `${defaultModelsUrl}${checkPoint}/${modelFileName}`;

    if (localModelRootDirectory) {
      modelPath = tf.io.fileSystem(
        `${localModelRootDirectory}/B${checkPoint}/${modelFileName}`
      );
    }

    const model = new EfficientNetModel(
      modelPath,
      inputLayerImageSize[checkPoint],
      locale
    );
    await model.load();
    return model;
  }
}
