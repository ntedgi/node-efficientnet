
import { EfficientNetLanguageProvider } from './EfficientNetLanguageProvider';
interface Prediction {
  label: string;
  precision: number;
}

export default class EfficientNetResult {
  result: Prediction[] = [];

  constructor(values: Float32Array, topK: number, languageProvider: EfficientNetLanguageProvider) {
    const arr = Array.from(values);
    const topValues = values
      .sort((a: number, b: number) => b - a)
      .slice(0, topK);
    const indexes = topValues.map((e: number) => arr.indexOf(e));
    const sum = topValues.reduce((a: number, b: number) => {
      return a + b;
    }, 0);
    indexes.forEach((value: number, index: number) => {
      this.result.push({
        label: languageProvider.get(value),
        precision: (topValues[index] / sum) * 100,
      } as Prediction);
    });
  }
}
