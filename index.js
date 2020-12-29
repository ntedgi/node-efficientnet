const tfnode = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
let jsonData = require('./misc/labels_map.json');
const modelPath = 'https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib/tfjs/web_model/model.json';
const IMAGE_FILE_PATH = "./panda.jpg";
const IMAGE_SIZE = 224;
const NUM_OF_CHANNELS = 3;

const loadLocalImage = async (filename) => {
    const image = await Jimp.read(filename);
    const width = image.bitmap.width
    const height = image.bitmap.height
    const cropPadding = 32
    const paddedCenterCropSize = (IMAGE_SIZE / (IMAGE_SIZE + cropPadding)) * Math.min(height, width)
    const offsetHeight = (((height - paddedCenterCropSize) + 1) / 2 >> 0)
    const offsetWidth = (((width - paddedCenterCropSize) + 1) / 2 >> 0)
    await image.crop(offsetWidth, offsetHeight, paddedCenterCropSize, paddedCenterCropSize)
    await image.resize(IMAGE_SIZE, IMAGE_SIZE, Jimp.RESIZE_BICUBIC);
    await image.writeAsync(`test/${Date.now()}_crop_${IMAGE_SIZE}x${IMAGE_SIZE}.png`);
    let values = new Float32Array(IMAGE_SIZE * IMAGE_SIZE * NUM_OF_CHANNELS);
    let i = 0;
    const mean = [0.485, 0.456, 0.406]
    const std = [0.229, 0.224, 0.225]
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        pixel.r = pixel.r / 127.0 - 1;
        pixel.g = pixel.g / 127.0 - 1;
        pixel.b = pixel.b / 127.0 - 1;
        pixel.a = pixel.a / 127.0 - 1;
        // values[i * NUM_OF_CHANNELS + 0] = (pixel.r - mean[0]) / std[0]
        // values[i * NUM_OF_CHANNELS + 1] = (pixel.g - mean[1]) / std[1]
        // values[i * NUM_OF_CHANNELS + 2] = (pixel.b - mean[2]) / std[2]
        values[i * NUM_OF_CHANNELS + 0] = pixel.r;
        values[i * NUM_OF_CHANNELS + 1] = pixel.g;
        values[i * NUM_OF_CHANNELS + 2] = pixel.b;
        i++;
    });

    const outShape = [IMAGE_SIZE, IMAGE_SIZE, NUM_OF_CHANNELS];
    let img_tensor = tfnode.tensor3d(values, outShape, 'float32');
    img_tensor = img_tensor.expandDims(0);
    const img_tensorAsarray = img_tensor.dataSync()
    console.log(img_tensorAsarray)
    return img_tensor
}

const load = async () => {
    const model = await tfnode.loadGraphModel(modelPath);
    return model
}

load().then(async model => {

    const result = await loadLocalImage(IMAGE_FILE_PATH)
    const objectArray = model.predict(result)
    const values = objectArray.dataSync();
    const arr = Array.from(values);
    const topValues = values.sort((a, b) => b - a).slice(0, 5);
    const indexes = topValues.map(e => arr.indexOf(e))
    indexes.forEach(index => {
        console.log(`${index} [ ${arr[index]} ] : ${jsonData[index]}`)

    })

})
