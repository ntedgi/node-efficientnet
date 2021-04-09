import * as fs from "fs";
import * as path from "path";

export enum EfficientNetLableLanguage {
  ENGLISH,
  CHINESE,
  SPANISH,
}
export class EfficientNetLanguageProvider {
  private filePath = "misc/en.json";
  private labelsMap = null;

  constructor(language: EfficientNetLableLanguage | undefined) {
    let fileName = null;
    if (language) {
      language as EfficientNetLableLanguage;
      switch (+language) {
        case EfficientNetLableLanguage.CHINESE:
          fileName = "zh";
          break;
        case EfficientNetLableLanguage.ENGLISH:
          fileName = "en";
          break;
        case EfficientNetLableLanguage.SPANISH:
          fileName = "es";
        break;
      }
    }
    this.filePath = fileName ? `misc/${fileName}.json` : this.filePath;
  }

  async load(): Promise<void> {
    const jsonFile = path.join(__dirname, this.filePath);
    const translationFile = await fs.readFileSync(jsonFile, "utf8");
    this.labelsMap = JSON.parse(translationFile);
  }

  get(value: number): string | undefined {
    if (!this.labelsMap)
      throw "EfficientNetLanguageProvider error faild loading translation file.";
    return this.labelsMap?.[value];
  }
}
