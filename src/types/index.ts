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
  interpretation: string;
}

export interface House {
  number: number;
  sign: string;
  ruler: string;
  interpretation: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
  interpretation: string;
}

export interface ChartData {
  ascendant: string;
  houses: House[];
  planets: Planet[];
  aspects: Aspect[];
}

export interface Analysis {
  ascendant: string;
  sunSign: string;
  moonSign: string;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  strengths: string[];
  challenges: string[];
  recommendations: Recommendation[];
  interestAnalysis: { [key: string]: string };
}

export interface Recommendation {
  area: string;
  advice: string;
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