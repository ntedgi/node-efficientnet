export default interface Prediction {
  label: string;
  precision: number;
}

export interface RecentPredictionEntry {
  id: number;
  predictions: Prediction[];
  imageBase64: string;
  language: string;
  timestamp: string;
}
