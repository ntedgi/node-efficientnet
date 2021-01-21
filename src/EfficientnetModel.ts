import * as tf from "@tensorflow/tfjs-node";
import * as Jimp from "jimp";
import * as cliProgress from "cli-progress";
import EfficientNetResult from "./EfficientNetResult";

const NUM_OF_CHANNELS = 3;

export default class EfficientNetModel {
  modelPath: string;
  imageSize: number;
  model: tf.GraphModel | undefined;

  constructor(modelPath: string, imageSize: number) {
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

  private async createTensor(image: Jimp): Promise<tf.Tensor3D> {
    const values = new Float32Array(
      this.imageSize * this.imageSize * NUM_OF_CHANNELS
    );
    let i = 0;
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      (x: number, y: number) => {
        const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        pixel.r = ((pixel.r - 1) / 127.0) >> 0;
        pixel.g = ((pixel.g - 1) / 127.0) >> 0;
        pixel.b = ((pixel.b - 1) / 127.0) >> 0;
        values[i * NUM_OF_CHANNELS + 0] = pixel.r;
        values[i * NUM_OF_CHANNELS + 1] = pixel.g;
        values[i * NUM_OF_CHANNELS + 2] = pixel.b;
        i++;
      }
    );
    const outShape: [number, number, number] = [
      this.imageSize,
      this.imageSize,
      NUM_OF_CHANNELS,
    ];
    let imageTensor = tf.tensor3d(values, outShape, "float32");
    imageTensor = imageTensor.expandDims(0);
    return imageTensor;
  }

  private async cropAndResize(image: Jimp): Promise<Jimp> {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const cropPadding = 32;
    const paddedCenterCropSize =
      ((this.imageSize / (this.imageSize + cropPadding)) *
        Math.min(height, width)) >>
      0;
    const offsetHeight = ((height - paddedCenterCropSize + 1) / 2) >> 0;
    const offsetWidth = (((width - paddedCenterCropSize + 1) / 2) >> 0) + 1;

    await image.crop(
      offsetWidth,
      offsetHeight,
      paddedCenterCropSize,
      paddedCenterCropSize
    );
    await image.resize(this.imageSize, this.imageSize, Jimp.RESIZE_BICUBIC);
    return image;
  }

  private async predict(tensor: tf.Tensor3D, topK: number): Promise<EfficientNetResult> {
    const objectArray = this.model!.predict(tensor) as tf.Tensor;
    const values = objectArray.dataSync() as Float32Array;
    return new EfficientNetResult(values, topK);
  }

  async inference(imgPath: string | Buffer, topK?: number): Promise<EfficientNetResult> {
    if (typeof topK === 'undefined' || topK === null)
      topK = 3
    // @ts-ignore
    let image = await Jimp.read(imgPath);
    image = await this.cropAndResize(image);
    const tensor = await this.createTensor(image);
    return this.predict(tensor, topK);
  }
}
