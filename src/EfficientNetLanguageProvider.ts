const defaultLabelsFilePath = '../misc/en.json'
import * as fs from 'fs';
import * as  path from 'path';

export enum EfficientNetLableLanguage {
    ENGLISH,
    CHINESE,
}

export class EfficientNetLanguageProvider {
    private filePath: string = defaultLabelsFilePath;
    private labelsMap = null;

    constructor(language: EfficientNetLableLanguage | undefined) {
        let fileName = null
        if (language) {
            language as EfficientNetLableLanguage;
            switch (+language) {
                case EfficientNetLableLanguage.CHINESE:
                    fileName = "zh";
                    break;
                case EfficientNetLableLanguage.ENGLISH:
                    fileName = "en";
                    break;

            }
        }
        this.filePath = fileName ? `../misc/${fileName}.json` : defaultLabelsFilePath
    }

    async load(): Promise<void> {
        const jsonFile = path.join(__dirname, this.filePath)
        let translationFile = fs.readFileSync(jsonFile);
        this.labelsMap = JSON.parse(translationFile);
    }

    get(value: number): string | null {
        return this.labelsMap ? this.labelsMap[value] : null
    }

}