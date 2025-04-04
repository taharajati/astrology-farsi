import { BirthInfo, ChartData, Analysis, Planet, House, Aspect, Recommendation } from '../types';

// Mock data for demonstration
const mockChartData: ChartData = {
  sunSign: 'اسد',
  moonSign: 'دلو',
  ascendant: 'میزان',
  planets: [
    { name: 'خورشید', sign: 'اسد', house: 5, degree: 120, isRetrograde: false },
    { name: 'ماه', sign: 'دلو', house: 10, degree: 300, isRetrograde: false },
    { name: 'عطارد', sign: 'سنبله', house: 6, degree: 150, isRetrograde: false },
    { name: 'زهره', sign: 'اسد', house: 5, degree: 125, isRetrograde: false },
    { name: 'مریخ', sign: 'میزان', house: 1, degree: 0, isRetrograde: false },
  ],
  houses: [
    { number: 1, sign: 'میزان', degree: 0 },
    { number: 2, sign: 'عقرب', degree: 30 },
    { number: 3, sign: 'قوس', degree: 60 },
    { number: 4, sign: 'جدی', degree: 90 },
    { number: 5, sign: 'دلو', degree: 120 },
    { number: 6, sign: 'حوت', degree: 150 },
    { number: 7, sign: 'حمل', degree: 180 },
    { number: 8, sign: 'ثور', degree: 210 },
    { number: 9, sign: 'جوزا', degree: 240 },
    { number: 10, sign: 'سرطان', degree: 270 },
    { number: 11, sign: 'اسد', degree: 300 },
    { number: 12, sign: 'سنبله', degree: 330 },
  ],
  aspects: [
    { planet1: 'خورشید', planet2: 'ماه', type: 'تریل', degree: 60 },
    { planet1: 'خورشید', planet2: 'عطارد', type: 'مربع', degree: 90 },
    { planet1: 'ماه', planet2: 'زهره', type: 'مقارنه', degree: 0 },
  ],
};

const mockAnalysis: Analysis = {
  personality: 'شما فردی خلاق و مستقل هستید که به دنبال بیان فردیت خود می‌گردید. طالع میزان نشان‌دهنده‌ی تعادل و عدالت‌طلبی در شخصیت شماست.',
  relationships: 'در روابط عاطفی، شما فردی وفادار و صادق هستید. با توجه به قرارگیری زهره در برج اسد، عشق و محبت در زندگی شما نقش مهمی دارد.',
  career: 'با توجه به قرارگیری خورشید در خانه پنجم، شما در زمینه‌های خلاقانه و هنری موفق خواهید بود. همچنین با توجه به قرارگیری ماه در خانه دهم، در مسیر شغلی خود پیشرفت خوبی خواهید داشت.',
  strengths: ['خلاقیت', 'استقلال', 'عدالت‌طلبی', 'وفاداری'],
  weaknesses: ['خودرایی', 'حساسیت بیش از حد', 'وسواس در کمال‌طلبی'],
  recommendations: [
    'به دنبال فعالیت‌های خلاقانه باشید',
    'در تصمیم‌گیری‌ها تعادل را رعایت کنید',
    'به دیگران فرصت ابراز وجود دهید',
  ],
};

class AstrologyService {
  private getZodiacSign(date: Date): string {
    // محاسبه برج بر اساس تاریخ
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'حمل';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'ثور';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'جوزا';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'سرطان';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'اسد';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'سنبله';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'میزان';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'عقرب';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'قوس';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'جدی';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'دلو';
    return 'حوت';
  }

  private calculateAscendant(birthTime: string, birthDate: Date): string {
    // محاسبه طالع بر اساس ساعت و تاریخ تولد
    const [hours, minutes] = birthTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // این یک محاسبه ساده‌شده است و در واقعیت به محاسبات پیچیده‌تری نیاز دارد
    const ascendantSigns = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
    const index = Math.floor((totalMinutes + dayOfYear * 4) / 120) % 12;
    return ascendantSigns[index];
  }

  private generatePlanetInterpretation(planet: string, sign: string, house: number): string {
    // تفسیر موقعیت سیاره در برج و خانه
    return `${planet} در برج ${sign} و خانه ${house} نشان‌دهنده ${this.getRandomInterpretation(planet, sign, house)} است.`;
  }

  private getRandomInterpretation(planet: string, sign: string, house: number): string {
    const interpretations = {
      'خورشید': [
        'قدرت و اراده شما',
        'هویت اصلی شما',
        'مسیر زندگی شما'
      ],
      'ماه': [
        'احساسات و عواطف شما',
        'نیازهای عاطفی شما',
        'ارتباط شما با خانواده'
      ],
      'عطارد': [
        'نحوه تفکر و ارتباط شما',
        'یادگیری و هوش شما',
        'مهارت‌های ارتباطی شما'
      ]
    };
    
    const planetInterpretations = interpretations[planet] || ['تأثیرات خاص در زندگی شما'];
    return planetInterpretations[Math.floor(Math.random() * planetInterpretations.length)];
  }

  private generateHouseInterpretation(houseNumber: number, ruler: string): string {
    // تفسیر خانه و حاکم آن
    const houseInterpretations = {
      1: 'شخصیت و ظاهر شما',
      2: 'دارایی‌ها و ارزش‌های شما',
      3: 'ارتباطات و یادگیری',
      4: 'خانه و خانواده',
      5: 'خلاقیت و عشق',
      6: 'کار و سلامت',
      7: 'روابط و مشارکت‌ها',
      8: 'تحول و معنویت',
      9: 'سفر و فلسفه',
      10: 'حرفه و موفقیت',
      11: 'دوستی‌ها و آرزوها',
      12: 'معنویت و خودشناسی'
    };
    
    return `خانه ${houseNumber} که تحت تأثیر ${ruler} است، نشان‌دهنده ${houseInterpretations[houseNumber]} است.`;
  }

  private generateAspectInterpretation(planet1: string, planet2: string, type: string): string {
    // تفسیر جنبه بین دو سیاره
    const aspectTypes = {
      'مثلث': 'هماهنگی و جریان مثبت',
      'تربیع': 'چالش و رشد',
      'مقابله': 'تنش و تضاد',
      'تسدیس': 'فرصت و همکاری'
    };
    
    return `${planet1} در ${type} با ${planet2} نشان‌دهنده ${aspectTypes[type]} در زندگی شماست.`;
  }

  async calculateBirthChart(birthInfo: BirthInfo): Promise<ChartData> {
    const birthDate = new Date(birthInfo.birthDate);
    const ascendant = this.calculateAscendant(birthInfo.birthTime, birthDate);
    
    // ایجاد لیست سیارات
    const planets: Planet[] = [
      { name: 'خورشید', sign: this.getZodiacSign(birthDate), house: 1, degree: 15, interpretation: '' },
      { name: 'ماه', sign: 'سرطان', house: 4, degree: 23, interpretation: '' },
      { name: 'عطارد', sign: 'جوزا', house: 3, degree: 8, interpretation: '' },
      { name: 'زهره', sign: 'ثور', house: 2, degree: 17, interpretation: '' },
      { name: 'مریخ', sign: 'حمل', house: 1, degree: 5, interpretation: '' }
    ];
    
    // اضافه کردن تفسیر به هر سیاره
    planets.forEach(planet => {
      planet.interpretation = this.generatePlanetInterpretation(planet.name, planet.sign, planet.house);
    });
    
    // ایجاد لیست خانه‌ها
    const houses: House[] = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: this.getZodiacSign(new Date(birthDate.getTime() + i * 2 * 24 * 60 * 60 * 1000)),
      ruler: planets[i % 5].name,
      interpretation: ''
    }));
    
    // اضافه کردن تفسیر به هر خانه
    houses.forEach(house => {
      house.interpretation = this.generateHouseInterpretation(house.number, house.ruler);
    });
    
    // ایجاد لیست جنبه‌ها
    const aspects: Aspect[] = [
      { planet1: 'خورشید', planet2: 'ماه', type: 'مثلث', orb: 2, interpretation: '' },
      { planet1: 'عطارد', planet2: 'زهره', type: 'تربیع', orb: 3, interpretation: '' },
      { planet1: 'مریخ', planet2: 'زهره', type: 'تسدیس', orb: 1, interpretation: '' }
    ];
    
    // اضافه کردن تفسیر به هر جنبه
    aspects.forEach(aspect => {
      aspect.interpretation = this.generateAspectInterpretation(aspect.planet1, aspect.planet2, aspect.type);
    });
    
    return {
      ascendant,
      planets,
      houses,
      aspects
    };
  }

  async generateAnalysis(chartData: ChartData, birthInfo: BirthInfo): Promise<Analysis> {
    // تولید تحلیل بر اساس چارت تولد
    const strengths = [
      'توانایی رهبری و هدایت دیگران',
      'خلاقیت و نوآوری در کار',
      'مهارت‌های ارتباطی قوی',
      'درک عمیق از احساسات دیگران',
      'استعداد در حل مسائل پیچیده'
    ];
    
    const challenges = [
      'نیاز به یافتن تعادل بین کار و زندگی شخصی',
      'مدیریت استرس و فشارهای روزمره',
      'تصمیم‌گیری در شرایط سخت',
      'برقراری ارتباط عمیق با دیگران',
      'پذیرش تغییرات ناگهانی'
    ];
    
    const recommendations: Recommendation[] = [
      {
        area: 'شغلی',
        advice: 'زمان مناسبی برای شروع پروژه‌های جدید است. از خلاقیت خود استفاده کنید.'
      },
      {
        area: 'روابط',
        advice: 'ارتباطات خود را عمیق‌تر کنید و به نیازهای عاطفی دیگران توجه بیشتری نشان دهید.'
      },
      {
        area: 'سلامتی',
        advice: 'به استراحت و تمدد اعصاب بیشتر اهمیت دهید. ورزش منظم را در برنامه خود قرار دهید.'
      }
    ];
    
    const interestAnalysis: { [key: string]: string } = {};
    birthInfo.interests.forEach(interest => {
      switch (interest) {
        case 'عشق و روابط':
          interestAnalysis[interest] = 'زمان مناسبی برای تقویت روابط عاطفی است. به ندای قلب خود گوش دهید.';
          break;
        case 'شغل و حرفه':
          interestAnalysis[interest] = 'فرصت‌های شغلی جدیدی در راه است. آماده تغییرات مثبت باشید.';
          break;
        case 'سلامت و تندرستی':
          interestAnalysis[interest] = 'توجه به سلامت جسمی و روحی در اولویت قرار دارد.';
          break;
        default:
          interestAnalysis[interest] = 'این حوزه پتانسیل خوبی برای رشد و پیشرفت دارد.';
      }
    });
    
    return {
      ascendant: chartData.ascendant,
      sunSign: chartData.planets.find(p => p.name === 'خورشید')?.sign || 'نامشخص',
      moonSign: chartData.planets.find(p => p.name === 'ماه')?.sign || 'نامشخص',
      planets: chartData.planets,
      houses: chartData.houses,
      aspects: chartData.aspects,
      strengths,
      challenges,
      recommendations,
      interestAnalysis
    };
  }
}

export const astrologyService = new AstrologyService(); 