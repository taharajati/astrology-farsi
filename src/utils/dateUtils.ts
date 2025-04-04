import { toGregorian, toJalaali } from 'jalaali-js';

export function convertToGregorian(persianDate: string): Date {
  // Handle both formats: YYYY/MM/DD and YYYY-MM-DD
  const [year, month, day] = persianDate.split(/[-\/]/).map(Number);
  const gregorian = toGregorian(year, month, day);
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
}

// New function specifically for the format used in BirthChart.tsx
export function convertPersianToGregorian(year: number, month: number, day: number): Date {
  const gregorian = toGregorian(year, month, day);
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
}

export function convertToPersian(date: Date): string {
  const jalaali = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jalaali.jy}/${String(jalaali.jm).padStart(2, '0')}/${String(jalaali.jd).padStart(2, '0')}`;
}

// New function to format Persian date with dash separator
export function formatPersianDateWithDash(date: Date): string {
  const jalaali = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jalaali.jy}-${String(jalaali.jm).padStart(2, '0')}-${String(jalaali.jd).padStart(2, '0')}`;
}

export function isValidPersianDate(dateStr: string): boolean {
  try {
    // Handle both formats: YYYY/MM/DD and YYYY-MM-DD
    const [year, month, day] = dateStr.split(/[-\/]/).map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    
    // بررسی محدوده‌های معتبر
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    // بررسی تعداد روزهای ماه
    const daysInMonth = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    if (day > daysInMonth[month]) return false;
    
    // بررسی سال کبیسه
    if (month === 12 && day === 29) {
      const isLeapYear = (year % 4 === 3);
      if (!isLeapYear) return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

export function getCurrentPersianDate(): string {
  return convertToPersian(new Date());
}

export function convertPersianTimeTo24Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function formatPersianDate(date: string): string {
  // Handle both formats: YYYY/MM/DD and YYYY-MM-DD
  const [year, month, day] = date.split(/[-\/]/);
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد',
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر',
    'دی', 'بهمن', 'اسفند'
  ];
  return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

export function formatTime(time: string): string {
  return time;
}

export function getTimezoneOffset(city: string): number {
  // این تابع باید با توجه به شهر انتخاب شده، آفست زمانی را برگرداند
  // فعلاً برای ایران ثابت است
  return 3.5; // UTC+3:30
}

// Persian (Jalaali) calendar conversion functions
// Based on the algorithm by Behrooz Karachian
// https://github.com/babakhani/pwt.datepicker

interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

interface PersianDate {
  year: number;
  month: number;
  day: number;
}

// Persian calendar constants
const PERSIAN_EPOCH = 1948320.5;
const GREGORIAN_EPOCH = 1721425.5;
const PERSIAN_MONTHS = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const PERSIAN_MONTHS_LEAP = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];

// Convert Persian date to Julian Day Number
function persianToJulianDay(year: number, month: number, day: number): number {
  const epy = year + 2346;
  const m = month - 1;
  const d = day - 1;
  
  let jd = PERSIAN_EPOCH - 1;
  jd += 365 * (epy - 1);
  jd += Math.floor(epy / 4);
  jd -= Math.floor(epy / 100);
  jd += Math.floor(epy / 400);
  jd += d;
  
  for (let i = 0; i < m; i++) {
    jd += PERSIAN_MONTHS[i];
  }
  
  return jd;
}

// Convert Julian Day Number to Persian date
function julianDayToPersian(jd: number): PersianDate {
  jd = Math.floor(jd) + 0.5;
  
  let depoch = jd - persianToJulianDay(475, 1, 1);
  const cycle = Math.floor(depoch / 1029983);
  const cyear = depoch % 1029983;
  
  let y1;
  if (cyear === 1029982) {
    y1 = 8 * cycle + 474;
  } else {
    const aux1 = Math.floor(cyear / 366);
    const aux2 = cyear % 366;
    y1 = 4 * cycle + Math.floor((4 * aux1 + aux2) / 1461);
  }
  
  const year = y1 + 2346;
  const yday = jd - persianToJulianDay(year, 1, 1) + 1;
  
  let month = 1;
  let day = yday;
  
  if (yday <= 186) {
    month = Math.ceil(yday / 31);
    day = yday - (month - 1) * 31;
  } else {
    month = Math.ceil((yday - 186) / 30) + 6;
    day = yday - 186 - (month - 7) * 30;
  }
  
  return { year, month, day };
}

// Convert Gregorian date to Persian date
export function gregorianToPersian(year: number, month: number, day: number): PersianDate {
  const jd = gregorianToJulianDay(year, month, day);
  return julianDayToPersian(jd);
}

// Convert Persian date to Gregorian date
export function persianToGregorian(year: number, month: number, day: number): GregorianDate {
  const jd = persianToJulianDay(year, month, day);
  return julianDayToGregorian(jd);
}

// Convert Gregorian date to Julian Day Number
function gregorianToJulianDay(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  if (jd < GREGORIAN_EPOCH) {
    jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  
  return jd;
}

// Convert Julian Day Number to Gregorian date
function julianDayToGregorian(jd: number): GregorianDate {
  let a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  
  return { year, month, day };
} 