import * as tf from "@tensorflow/tfjs-node-gpu";
import * as sharp from "sharp";
import * as cliProgress from "cli-progress";
import { io } from "@tensorflow/tfjs-core";

import EfficientNetResult from "./EfficientNetResult";

const NUM_OF_CHANNELS = 3;

export default class EfficientNetModel {
  modelPath: string | io.IOHandler;
  imageSize: number;
  model: tf.GraphModel | undefined;

  constructor(modelPath: string | io.IOHandler, imageSize: number) {
    this.modelPath = modelPath;
    this.imageSize = imageSize;
  }

  async load(): Promise<void> {
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

    const { width = 0, height = 0 } = await image.metadata();

    let resultWidth = this.imageSize;
    let resultHeight = this.imageSize;

    // auto adjust result w h
    if (width > height) {
      resultHeight = Math.ceil((height / width) * this.imageSize);
    } else {
      resultWidth = Math.ceil((width / height) * this.imageSize);
    }

    const x = 0;
    const y = 0;
    const w = resultWidth;
    const h = resultHeight;

    const bufferData = await image
      .resize(resultWidth, resultHeight)
      .raw()
      .toBuffer();

    for (let _y = y; _y < y + h; _y++) {
      for (let _x = x; _x < x + w; _x++) {
        const offset = NUM_OF_CHANNELS * (w * _y + _x);
        values[offset + 0] = ((bufferData[offset + 0] - 1) / 127.0) >> 0;
        values[offset + 1] = ((bufferData[offset + 1] - 1) / 127.0) >> 0;
        values[offset + 2] = ((bufferData[offset + 2] - 1) / 127.0) >> 0;
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
    return new EfficientNetResult(values, topK);
  }

  async inference(
    imgPath: string | Buffer,
    topK?: number
  ): Promise<EfficientNetResult> {
    topK = topK ?? NUM_OF_CHANNELS;
    const image = sharp(imgPath);
    const tensor = await this.createTensor(image);
    return this.predict(tensor, topK);
  }
}
