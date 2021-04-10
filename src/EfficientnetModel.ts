import * as tf from "@tensorflow/tfjs-node-gpu";
import * as sharp from "sharp";
import * as cliProgress from "cli-progress";
import { io } from "@tensorflow/tfjs-core";
import {
  EfficientNetLableLanguage,
  EfficientNetLanguageProvider,
} from "./EfficientNetLanguageProvider";
import EfficientNetResult from "./EfficientNetResult";

const NUM_OF_CHANNELS = 3;

interface EfficientNetModelInferenceOptions {
  topK?: number;
}

export default class EfficientNetModel {
  modelPath: string | io.IOHandler;
  imageSize: number;
  model: tf.GraphModel | undefined;
  languageProvider: EfficientNetLanguageProvider;
  constructor(
    modelPath: string | io.IOHandler,
    imageSize: number,
    local: EfficientNetLableLanguage | undefined
  ) {
    this.modelPath = modelPath;
    this.imageSize = imageSize;
    this.languageProvider = new EfficientNetLanguageProvider(local);
  }

  async load(): Promise<void> {
    await this.languageProvider.load();

    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    bar.start(100, 0);
    const model = await tf.loadGraphModel(this.modelPath, {
      onProgress: (p) => {
        bar.update(p * 100);
      },
    });
    bar.stop();
    this.model = model;
  }

  private async createTensor(image: sharp.Sharp): Promise<tf.Tensor3D> {
    const values = new Float32Array(
      this.imageSize * this.imageSize * NUM_OF_CHANNELS
    );

    const metadata = await image.metadata();
    const { width = 0, height = 0 } = metadata;
    const realSize = Math.min(width, height);

    const x = 0;
    const y = 0;
    const w = this.imageSize;
    const h = this.imageSize;

    const bufferData = await image
      .extract({
        left: width > height ? Math.floor((width - height) / 2) : 0,
        top: height > width ? Math.floor((height - width) / 2) : 0,
        width: realSize,
        height: realSize,
      })
      .resize(this.imageSize, this.imageSize)
      .removeAlpha() // keep 3 channels
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let _y = y; _y < y + h; _y++) {
      for (let _x = x; _x < x + w; _x++) {
        const offset = NUM_OF_CHANNELS * (w * _y + _x);
        values[offset + 0] = ((bufferData.data[offset + 0] - 1) / 127.0) >> 0;
        values[offset + 1] = ((bufferData.data[offset + 1] - 1) / 127.0) >> 0;
        values[offset + 2] = ((bufferData.data[offset + 2] - 1) / 127.0) >> 0;
      }
    }

    const outShape: [number, number, number] = [
      this.imageSize,
      this.imageSize,
      NUM_OF_CHANNELS,
    ];
    let imageTensor = tf.tensor3d(values, outShape, "float32");
    imageTensor = imageTensor.expandDims(0);
    return imageTensor;
  }

  private async predict(
    tensor: tf.Tensor3D,
    topK: number
  ): Promise<EfficientNetResult> {
    const objectArray = this.model!.predict(tensor) as tf.Tensor;
    const values = objectArray.dataSync() as Float32Array;
    return new EfficientNetResult(values, topK, this.languageProvider);
  }

  async inference(
    imgPath: string | Buffer,
    options?: EfficientNetModelInferenceOptions
  ): Promise<EfficientNetResult> {
    const { topK = NUM_OF_CHANNELS } = options || {};
    const image = sharp(imgPath);
    const tensor = await this.createTensor(image);
    return this.predict(tensor, topK);
  }
}
