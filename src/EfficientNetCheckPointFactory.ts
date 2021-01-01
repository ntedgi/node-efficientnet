import EfficientNetModel from "./EfficientnetModel";
import {EfficientNetCheckPoint} from "./EfficientNetCheckPoint";


export default class EfficientNetCheckPointFactory {
    static async create(
        checkPoint: EfficientNetCheckPoint
    ): Promise<EfficientNetModel> {
        switch (checkPoint) {
            case EfficientNetCheckPoint.B0: {
                const modelPath =
                    "https://raw.githubusercontent.com/ntedgi/efficientnet/main/lib/tfjs/web_model/model.json";
                const model = new EfficientNetModel(modelPath, 244);
                await model.load();
                return model;
            }
            default: {
                throw Error(`${checkPoint} - Not Implemented Yet!`);
            }
        }
    }
}

