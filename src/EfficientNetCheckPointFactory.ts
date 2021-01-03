import EfficientNetModel from "./EfficientnetModel";
import { EfficientNetCheckPoint } from "./EfficientNetCheckPoint";

const defaultModelsUrl =
  "https://raw.githubusercontent.com/ntedgi/efficientnet-tensorflowjs-binaries/main/models/B";
const modelFileName = "model.json";
const inputLayerImageSize = [224, 240, 260, 300, 380, 456, 528, 600];

export default class EfficientNetCheckPointFactory {
  static async create(
    checkPoint: EfficientNetCheckPoint
  ): Promise<EfficientNetModel> {
    // const modelPath ="file:///Users/naortedgi/Desktop/projects/node-efficientnet/lib/models/B0/model.json"
    const modelPath = `${defaultModelsUrl}${checkPoint}/${modelFileName}`;
    const model = new EfficientNetModel(
      modelPath,
      inputLayerImageSize[checkPoint]
    );
    await model.load();
    return model;
  }
}
