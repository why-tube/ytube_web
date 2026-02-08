import React from 'react';

export type Region = 'INDIA' | 'KOREA';

export interface PricingOption {
  price: number;
  originalPrice: number;
  label: string;
}

export interface PlanFeature {
  text: string;
  icon: string;
}

export interface Plan {
  id: string;
  name: string;
  period: string;
  durationMonths: number;
  features: PlanFeature[];
  bestValue?: boolean;
  options: {
    INDIA?: PricingOption;
    KOREA: PricingOption;
  };
}

export interface ServiceData {
  id: string;
  name: string;
  themeColor: string;
  chatUrl: string;
  toggleLabels: {
    left: string; // Maps to KOREA key
    right: string; // Maps to INDIA key
  };
  hero: {
    badge: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
  };
  features: {
    icon: string;
    title: string;
    desc: string;
  }[];
  plans: Plan[];
  faqs: {
    q: string;
    a: string;
  }[];
}