export interface WidgetConfig {
  id: number;
  component: string;
  settings: Record<string, any>;
}

export interface User {
  id: number;
  name: string;
  city: string;
}

export interface Weather {
  city: string;
  temperature: number;
  description: string;
}

export interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export interface UserProfileSettings {
  userId: number;
}

export interface WeatherSettings {
  defaultCity: string;
}

export interface StockTickerSettings {
  symbols: string[];
}

