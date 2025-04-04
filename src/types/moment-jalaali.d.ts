declare module 'moment-jalaali' {
  import { Moment } from 'moment';
  
  interface MomentJalaali extends Moment {
    jYear(): number;
    jMonth(): number;
    jDate(): number;
    jDayOfYear(): number;
    jDayOfWeek(): number;
    jWeek(): number;
    jWeekYear(): number;
    jDaysInMonth(): number;
    jIsLeapYear(): boolean;
    jStartOf(unit: string): MomentJalaali;
    jEndOf(unit: string): MomentJalaali;
    jSubtract(amount: number, unit: string): MomentJalaali;
    jAdd(amount: number, unit: string): MomentJalaali;
  }
  
  interface MomentStatic {
    jalaali: {
      (year: number, month: number, day: number): MomentJalaali;
      (date: Date): MomentJalaali;
      (date: string, format?: string): MomentJalaali;
      (date: string, format: string, strict: boolean): MomentJalaali;
      (date: string, formats: string[], strict?: boolean): MomentJalaali;
      (date: string, formats: string[], locale: string, strict?: boolean): MomentJalaali;
    };
  }
} 