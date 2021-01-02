import EfficientNetModel from "./EfficientnetModel";
import {EfficientNetCheckPoint} from "./EfficientNetCheckPoint";


const fsPath ="file://./lib/tfjs/web_model/model.json"
const defaultModelsUrl = "https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib"
const modelFileName = "model.json"
const inputLayerImageSize = [224, 240, 260, 300, 380, 456, 528, 600]

export default class EfficientNetCheckPointFactory {

    static async create(
        checkPoint: EfficientNetCheckPoint,
        path: string | undefined = undefined
    ): Promise<EfficientNetModel> {
        const modelPath = path ? path : `${defaultModelsUrl}/tfjs/web_model/${modelFileName}`;
        switch (checkPoint) {
            case EfficientNetCheckPoint.B0: {
                const model = new EfficientNetModel(fsPath, inputLayerImageSize[checkPoint]);
                await model.load();
                return model;
            }
            default: {
                throw Error(`${checkPoint} - Not Implemented Yet!`);
            }
        }
    }
}

