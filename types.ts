export type Region = 'INDIA' | 'KOREA';

export interface PricingOption {
  price: number;
  originalPrice: number;
  label: string;
}

export interface Plan {
  id: string;
  name: string;
  period: string;
  features: string[];
  bestValue?: boolean;
  options: {
    INDIA: PricingOption;
    KOREA: PricingOption;
  };
}