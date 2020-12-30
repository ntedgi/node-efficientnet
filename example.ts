const fs = require('fs');
const nodeFetch = require('node-fetch');

const {
    EfficientnetCheckPointFactory,
    EfficientnetCheckPoint,
    EfficientnetModel
} = require("./index")

const images = ['car.jpg', 'panda.jpg']
const imageDir = "./samples"
const imageDirRemoteUri = "https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples"

fs.mkdirSync(imageDir)

async function download(image: String, cb: Function) {
    const response = await nodeFetch(`${imageDirRemoteUri}/${image}`);
    const buffer = await response.buffer();
    fs.writeFile(`${imageDir}/${image}`, buffer, cb)
}


EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
    .then((model: typeof EfficientnetModel) => {
        images.forEach(async (image) => {
            await download(image, () => {
                model.inference(`${imageDir}/${image}`).then((result: { result: any; }) => {
                    console.log(result.result)
                })
            })

        })
    })
    .catch((e: Error) => {
        console.error(e)
    })



