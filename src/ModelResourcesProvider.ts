import { EfficientNetCheckPoint } from "./EfficientNetCheckPoint";
import * as fs from "fs";
import * as nodeFetch from "node-fetch";

const workspaceDir = "./workspace";

export default class ModelResourcesProvider {
  private static downloadUri = (checkPoint: EfficientNetCheckPoint) =>
    `https://tfhub.dev/tensorflow/efficientnet/b${checkPoint}/classification/1?tf-hub-format=compressed`;

  private static async download(url: string, outputFilePath: string) {
    const response = await nodeFetch.default(url);
    const buffer = await response.buffer();
    await fs.writeFileSync(outputFilePath, buffer);
  }

  static async get(checkPoint: EfficientNetCheckPoint): Promise<string> {
    const modelDir = `${workspaceDir}/B${checkPoint}/model.tgz`;
    if (!fs.existsSync(workspaceDir)) {
      fs.mkdirSync(workspaceDir);
      await this.download(this.downloadUri(checkPoint), modelDir);
    }
    return "";
  }
  static async get(modelDir: File): Promise<string> {
    if (!fs.existsSync(workspaceDir)) {
      fs.mkdirSync(workspaceDir);
      await this.download(this.downloadUri(checkPoint), modelDir);
    }
    return "";
  }
}
