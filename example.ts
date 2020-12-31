import * as  fs from 'fs';
import * as nodeFetch from 'node-fetch';

import {
    EfficientnetCheckPointFactory,
    EfficientnetCheckPoint,
    EfficientnetModel,
    EfficientnetResult
} from "./index"

const images = ['car.jpg', 'panda.jpg']
const imageDir = "./samples"
const imageDirRemoteUri = "https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples"

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
}

async function download(image: string, cb: fs.NoParamCallback) {
    const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
    const buffer = await response.buffer();
    fs.writeFile(`${imageDir}/${image}`, buffer, cb)
}


EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
    .then((model: EfficientnetModel) => {
        images.forEach(async (image) => {
            await download(image, () => {
                model.inference(`${imageDir}/${image}`).then((result: EfficientnetResult) => {
                    console.log(result.result)
                })
            })

        })
    })
    .catch((e: Error) => {
        console.error(e)
    })



