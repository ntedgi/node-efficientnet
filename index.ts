const tfnode = require("@tensorflow/tfjs-node");
const Jimp = require("jimp");
const labelsMap = require("./misc/labels_map.json");

const NUM_OF_CHANNELS = 3;

enum EfficientnetCheckPoint {
  B0,
  B1,
  B2,
  B3,
  B4,
  B5,
  B6,
  B7,
}

export abstract class EfficientnetCheckPointFactory {
  static async create(
    checkPoint: EfficientnetCheckPoint
  ): Promise<EfficientnetModel> {
    switch (checkPoint) {
      case EfficientnetCheckPoint.B0: {
        const modelPath =
          "https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib/tfjs/web_model/model.json";
        const model = new EfficientnetModel(modelPath, 244);
        await model.load();
        return model;
      }
      default: {
        throw Error(`${checkPoint} - Not Implemented Yet!`);
      }
    }
  }
}

class EfficientnetResult {}

export class EfficientnetModel {
  modelPath: string;
  imageSize: number;
  model: any;
  constructor(modelPath: string, imageSize: number) {
    this.modelPath = modelPath;
    this.imageSize = imageSize;
  }
  async load() {
    const model = await tfnode.loadGraphModel(this.modelPath);
    this.model = model;
  }

  private async createTensor(image: any): Promise<any> {
    let values = new Float32Array(
      this.imageSize * this.imageSize * NUM_OF_CHANNELS
    );
    let i = 0;
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      (x: number, y: number, idx: number) => {
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
    const outShape = [this.imageSize, this.imageSize, NUM_OF_CHANNELS];
    let imageTensor = tfnode.tensor3d(values, outShape, "float32");
    imageTensor = imageTensor.expandDims(0);
    return imageTensor;
  }
  private async cropAndResize(image: any): Promise<any> {
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
  private async predict(tensor: any): Promise<EfficientnetResult> {
    const objectArray = await this.model.predict(tensor);
    const values = objectArray.dataSync();
    const arr = Array.from(values);
    const topValues = values.sort((a: number, b: number) => b - a).slice(0, 3);
    const indexes = topValues.map((e: number) => arr.indexOf(e));
    const sum = topValues.reduce((a: number, b: number) => {
      return a + b;
    }, 0);
    indexes.forEach((value: number, index: number) => {
      console.log(
        `${value} [ ${(topValues[index] / sum) * 100} ] : ${labelsMap[value]}`
      );
    });
    return new EfficientnetResult();
  }
  async inference(imgPath: string): Promise<EfficientnetResult> {
    let image = await Jimp.read(imgPath);
    image = await this.cropAndResize(image);
    const tensor = await this.createTensor(image);
    return this.predict(tensor);
  }
}
