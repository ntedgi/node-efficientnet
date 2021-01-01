import * as tf from "@tensorflow/tfjs-node";
import * as Jimp from "jimp";
import EfficientNetResult from "./EfficientNetResult"

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
        const model = await tf.loadGraphModel(this.modelPath);
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
        const outShape: number[] = Array(...[this.imageSize, this.imageSize, NUM_OF_CHANNELS]);
        // @ts-ignore
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


    private async predict(tensor: tf.Tensor3D): Promise<EfficientNetResult> {
        // @ts-ignore
        const objectArray = this.model.predict(tensor);
        // @ts-ignore
        const values = objectArray.dataSync();
        return new EfficientNetResult(values);
    }

    async inference(imgPath: string): Promise<EfficientNetResult> {
        let image = await Jimp.read(imgPath);
        image = await this.cropAndResize(image);
        const tensor = await this.createTensor(image);
        return this.predict(tensor);
    }
}

