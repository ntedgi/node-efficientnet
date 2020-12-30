const {
    EfficientnetCheckPointFactory,
    EfficientnetCheckPoint,
    EfficientnetModel

} = require("./index")
const samples = ['samples/car.jpg','samples/panda.jpg']

EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0).then((model:typeof EfficientnetModel)=>{
    samples.forEach(async (image) => {
        const result = await model.inference(image)
        console.log(result.result)
    })
}).catch((e:Error)=>{
    console.error(e)
})




