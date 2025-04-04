export interface BirthInfo {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  calendarType: 'persian' | 'gregorian';
  interests: string[];
}

export interface Planet {
  name: string;
  sign: string;
  house: number;
  degree: number;
  isRetrograde: boolean;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  degree: number;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: string;
  timeframe?: string;
}

export interface DetailedAnalysis {
  planets: string[];
  houses: string[];
  aspects: string[];
}

export interface ChartData {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
}

export interface Analysis {
  personality: string;
  relationships: string;
  career: string;
  lifePath: string;
  strengths: string[];
  challenges: string[];
  recommendations: Recommendation[];
  detailedAnalysis: DetailedAnalysis;
}

export interface UserProfile {
  id: string;
  name: string;
  birthInfo: BirthInfo;
  chartData: ChartData;
  analysis: Analysis;
  createdAt: Date;
  updatedAt: Date;
} 