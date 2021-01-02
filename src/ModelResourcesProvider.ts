import {EfficientNetCheckPoint} from "./EfficientNetCheckPoint";
import * as  fs from 'fs';

const workspaceDir = "./workspace"
const downloadUri = "https://tfhub.dev/tensorflow/efficientnet/b0/classification/1?tf-hub-format=compressed"

class ModelResourcesProvider {

    async download(checkPoint: EfficientNetCheckPoint, cb: fs.NoParamCallback) {
        // const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
        // const buffer = await response.buffer();
        // fs.writeFile(`${imageDir}/${image}`, buffer, cb)
    }


    static async get(checkPoint: EfficientNetCheckPoint): Promise<string> {
        const modelDir = `${workspaceDir}/B${checkPoint}`
        if (!fs.existsSync(workspaceDir)) fs.mkdirSync(workspaceDir);

        return ""


    }
}

for (const item in EfficientNetCheckPoint) {
     ModelResourcesProvider.get(item)
}
