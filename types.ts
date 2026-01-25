export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  period: string;
  features: string[];
  bestValue?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}