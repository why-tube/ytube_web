export interface Plan {
  id: string;
  name: string;
  price: number | string;
  originalPrice: number;
  period: string;
  features: string[];
  bestValue?: boolean;
}