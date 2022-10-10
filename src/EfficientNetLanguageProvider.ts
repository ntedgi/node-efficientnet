import * as fs from "fs";
import * as path from "path";

export enum EfficientNetLabelLanguage {
  ENGLISH,
  CHINESE,
  SPANISH,
  ARABIC,
  HEBREW,
  RUSSIAN
}
export class EfficientNetLanguageProvider {
  private filePath = "misc/en.json";
  private labelsMap = null;

  constructor(language: EfficientNetLabelLanguage | undefined) {
    let fileName = null;
    if (language) {
      language as EfficientNetLabelLanguage;
      switch (+language) {
        case EfficientNetLabelLanguage.CHINESE:
          fileName = "zh";
          break;
        case EfficientNetLabelLanguage.ENGLISH:
          fileName = "en";
          break;
        case EfficientNetLabelLanguage.SPANISH:
          fileName = "es";
          break;
        case EfficientNetLableLanguage.RUSSIAN:
          fileName = "ru";
          break;
        case EfficientNetLableLanguage.ARABIC:
          fileName = "ar";
          break;
        case EfficientNetLabelLanguage.HEBREW:
          fileName = "he";
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
    return this.labelsMap?.[value];
  }
}
