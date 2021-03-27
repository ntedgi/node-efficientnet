import ImageNetLabelsI18n from "imagenet-labels-i18n";
interface Prediction {
  label: string;
  precision: number;
}

export default class EfficientNetResult {
  result: Prediction[] = [];

  constructor(values: Float32Array, topK: number, locale: string) {
    const arr = Array.from(values);
    const topValues = values
      .sort((a: number, b: number) => b - a)
      .slice(0, topK);
    const indexes = topValues.map((e: number) => arr.indexOf(e));
    const sum = topValues.reduce((a: number, b: number) => {
      return a + b;
    }, 0);

    ImageNetLabelsI18n.setLocale(locale);

    indexes.forEach((value: number, index: number) => {
      this.result.push({
        label: ImageNetLabelsI18n.__(String(value)),
        precision: (topValues[index] / sum) * 100,
      } as Prediction);
    });
  }
}
