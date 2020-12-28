
const tf = require('@tensorflow/tfjs-node');

const model_path = 'https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib/tfjs/web_model/model.json'
const load = async () => {

  const model = await tf.loadGraphModel(model_path);
  return model
}

load().then(model => {

  model.predict()
})