
const tf = require('@tensorflow/tfjs-node');


const load = async () => {

  const model = await tf.node.load('./lib/tfjs/model.json')
  model.summary()
  return model
}

load().then(model => {
  console.log(model)
})