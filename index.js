
const tf = require('@tensorflow/tfjs-node');

const model_path = 'https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib/tfjs/model.json'
const load = async () => {

  const model = await tf.loadLayersModel(model_path);
  model.summary()
  return model
}

load().then(model => {
  console.log(model)
})