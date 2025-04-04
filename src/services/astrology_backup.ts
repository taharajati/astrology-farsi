import { BirthInfo, ChartData, Analysis, Planet, House, Aspect, Recommendation, BirthChart, RelationshipAnalysis, PlanetInterpretations, HouseInterpretations, AspectInterpretations } from '../types';

// Mock data for demonstration
const mockChartData: ChartData = {
  ascendant: 'حمل',
  planets: [
    {
      name: 'خورشید',
      sign: 'حمل',
      house: 1,
      degree: 15,
      isRetrograde: false,
      interpretation: 'نماینده هویت و اراده فرد'
    },
    {
      name: 'ماه',
      sign: 'ثور',
      house: 2,
      degree: 25,
      isRetrograde: false,
      interpretation: 'نماینده احساسات و نیازهای عاطفی'
    },
    {
      name: 'عطارد',
      sign: 'حمل',
      house: 1,
      degree: 10,
      isRetrograde: false,
      interpretation: 'نماینده ارتباطات و تفکر'
    },
    {
      name: 'زهره',
      sign: 'ثور',
      house: 2,
      degree: 5,
      isRetrograde: false,
      interpretation: 'نماینده عشق و زیبایی'
    },
    {
      name: 'مریخ',
      sign: 'جوزا',
      house: 3,
      degree: 20,
      isRetrograde: false,
      interpretation: 'نماینده انرژی و اراده'
    }
  ],
  houses: [
    {
      number: 1,
      sign: 'حمل',
      degree: 0,
      ruler: 'مریخ',
      interpretation: 'نماینده شخصیت و ظاهر'
    },
    {
      number: 2,
      sign: 'ثور',
      degree: 30,
      ruler: 'زهره',
      interpretation: 'نماینده ثروت و ارزش‌ها'
    },
    {
      number: 3,
      sign: 'جوزا',
      degree: 60,
      ruler: 'عطارد',
      interpretation: 'نماینده ارتباطات و یادگیری'
    },
    {
      number: 4,
      sign: 'سرطان',
      degree: 90,
      ruler: 'ماه',
      interpretation: 'نماینده خانه و خانواده'
    },
    {
      number: 5,
      sign: 'اسد',
      degree: 120,
      ruler: 'خورشید',
      interpretation: 'نماینده خلاقیت و عشق'
    }
  ],
  aspects: [
    {
      planet1: 'خورشید',
      planet2: 'ماه',
      type: 'مربع',
      degree: 90,
      interpretation: 'چالش بین اراده و احساسات'
    }
  ]
};

const mockAnalysis: Analysis = {
  ascendant: 'حمل',
  sunSign: 'حمل',
  moonSign: 'ثور',
  planets: mockChartData.planets,
  houses: mockChartData.houses,
  aspects: mockChartData.aspects,
  strengths: ['خلاقیت', 'استقلال', 'عدالت‌طلبی', 'وفاداری'],
  challenges: ['خودرایی', 'حساسیت بیش از حد', 'وسواس در کمال‌طلبی'],
  recommendations: [
    {
      area: 'شغلی',
      advice: 'به دنبال فعالیت‌های خلاقانه باشید'
    },
    {
      area: 'روابط',
      advice: 'در تصمیم‌گیری‌ها تعادل را رعایت کنید'
    },
    {
      area: 'شخصی',
      advice: 'به دیگران فرصت ابراز وجود دهید'
    }
  ],
  interestAnalysis: {
    'عشق و روابط': 'زمان مناسبی برای تقویت روابط عاطفی است',
    'شغل و حرفه': 'فرصت‌های شغلی جدیدی در راه است',
    'سلامت و تندرستی': 'توجه به سلامت جسمی و روحی در اولویت قرار دارد'
  }
};

export class AstrologyService {
  private planetInterpretations: PlanetInterpretations = {
    'خورشید': ['نماینده هویت و اراده فرد'],
    'ماه': ['نماینده احساسات و نیازهای عاطفی'],
    'عطارد': ['نماینده ارتباطات و تفکر'],
    'زهره': ['نماینده عشق و زیبایی'],
    'مریخ': ['نماینده انرژی و اراده']
  };

  private houseInterpretations: HouseInterpretations = {
    1: 'نماینده شخصیت و ظاهر',
    2: 'نماینده ثروت و ارزش‌ها',
    3: 'نماینده ارتباطات و یادگیری',
    4: 'نماینده خانه و خانواده',
    5: 'نماینده خلاقیت و عشق',
    6: 'نماینده کار و سلامت',
    7: 'نماینده روابط و مشارکت',
    8: 'نماینده تحول و تغییر',
    9: 'نماینده سفر و فلسفه',
    10: 'نماینده شغل و جایگاه اجتماعی',
    11: 'نماینده دوستی و آرزوها',
    12: 'نماینده معنویت و درون'
  };

  private aspectInterpretations: AspectInterpretations = {
    'مثلث': 'هماهنگی و تعادل',
    'تربیع': 'چالش و رشد',
    'مقابله': 'تضاد و تکمیل',
    'تسدیس': 'فرصت و همکاری'
  };

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

  private calculateAscendant(birthTime: string, birthDate: string): string {
    try {
      // Parse birth time
      const [hours, minutes] = birthTime.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Invalid birth time format');
      }

      // Parse birth date
      const [year, month, day] = birthDate.split(/[-\/]/).map(Number);
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error('Invalid birth date format');
      }

      // Calculate total minutes since midnight
      const totalMinutes = hours * 60 + minutes;
      
      // Calculate day of year
      const date = new Date(year, month - 1, day);
      const startOfYear = new Date(year, 0, 0);
      const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

      // Calculate ascendant based on time and day of year
      // This is a simplified calculation - in reality, you would need more complex calculations
      // considering latitude, longitude, and sidereal time
      const ascendantIndex = Math.floor((totalMinutes + dayOfYear * 4) / 120) % 12;
      
      const ascendantSigns = [
        'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله',
        'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'
      ];

      return ascendantSigns[ascendantIndex];
    } catch (error) {
      console.error('Error calculating ascendant:', error);
      return 'حمل'; // Default to Aries if calculation fails
    }
  }

  private generatePlanetInterpretation(planet: string, sign: string, house: number): string {
    // تفسیر موقعیت سیاره در برج و خانه
    return `${planet} در برج ${sign} و خانه ${house} نشان‌دهنده ${this.getRandomInterpretation(planet, sign, house)} است.`;
  }

  private getRandomInterpretation(planet: string, sign: string, house: number): string {
    const interpretations: Record<string, string[]> = {
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
    const houseInterpretations: Record<number, string> = {
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
    const aspectTypes: Record<string, string> = {
      'مثلث': 'هماهنگی و جریان مثبت',
      'تربیع': 'چالش و رشد',
      'مقابله': 'تنش و تضاد',
      'تسدیس': 'فرصت و همکاری'
    };
    
    return `${planet1} در ${type} با ${planet2} نشان‌دهنده ${aspectTypes[type]} در زندگی شماست.`;
  }

  async calculateBirthChart(birthInfo: BirthInfo): Promise<ChartData> {
    const birthDate = new Date(birthInfo.birthDate);
    const ascendant = this.calculateAscendant(birthInfo.birthTime, birthInfo.birthDate);
    
    // ایجاد لیست سیارات
    const planets: Planet[] = [
      { 
        name: 'خورشید', 
        sign: this.getZodiacSign(birthDate), 
        house: 1, 
        degree: 15, 
        isRetrograde: false,
        interpretation: '' 
      },
      { 
        name: 'ماه', 
        sign: 'سرطان', 
        house: 4, 
        degree: 23, 
        isRetrograde: false,
        interpretation: '' 
      },
      { 
        name: 'عطارد', 
        sign: 'جوزا', 
        house: 3, 
        degree: 8, 
        isRetrograde: false,
        interpretation: '' 
      },
      { 
        name: 'زهره', 
        sign: 'ثور', 
        house: 2, 
        degree: 17, 
        isRetrograde: false,
        interpretation: '' 
      },
      { 
        name: 'مریخ', 
        sign: 'حمل', 
        house: 1, 
        degree: 5, 
        isRetrograde: false,
        interpretation: '' 
      }
    ];
    
    // اضافه کردن تفسیر به هر سیاره
    planets.forEach(planet => {
      planet.interpretation = this.generatePlanetInterpretation(planet.name, planet.sign, planet.house);
    });
    
    // ایجاد لیست خانه‌ها
    const houses: House[] = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: this.getZodiacSign(new Date(birthDate.getTime() + i * 2 * 24 * 60 * 60 * 1000)),
      degree: i * 30,
      ruler: planets[i % 5].name,
      interpretation: ''
    }));
    
    // اضافه کردن تفسیر به هر خانه
    houses.forEach(house => {
      house.interpretation = this.generateHouseInterpretation(house.number, house.ruler);
    });
    
    // ایجاد لیست جنبه‌ها
    const aspects: Aspect[] = [
      { 
        planet1: 'خورشید', 
        planet2: 'ماه', 
        type: 'مثلث', 
        degree: 120,
        interpretation: '' 
      },
      { 
        planet1: 'عطارد', 
        planet2: 'زهره', 
        type: 'تربیع', 
        degree: 90,
        interpretation: '' 
      },
      { 
        planet1: 'مریخ', 
        planet2: 'زهره', 
        type: 'تسدیس', 
        degree: 60,
        interpretation: '' 
      }
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

  private generateRelationshipAnalysis(birthChart: BirthChart): RelationshipAnalysis {
    return {
      compatibility: {
        overall: 75,
        emotional: 80,
        intellectual: 70,
        physical: 85,
        spiritual: 65
      },
      strengths: [
        'ارتباط عاطفی قوی',
        'درک متقابل',
        'اهداف مشترک'
      ],
      challenges: [
        'تفاوت در سبک زندگی',
        'نیاز به فضای شخصی',
        'مدیریت تعارضات'
      ],
      communication: {
        style: 'صادقانه و مستقیم',
        strengths: ['گوش دادن فعال', 'بیان احساسات'],
        challenges: ['اجتناب از تعارض', 'عدم درک کامل'],
        recommendations: ['تمرین گفتگوی سازنده', 'ایجاد فضای امن']
      },
      emotional: {
        connection: 'عمیق و معنادار',
        needs: ['امنیت عاطفی', 'حمایت متقابل'],
        expression: 'صادقانه و باز',
        growth: ['یادگیری زبان عشق یکدیگر', 'تقویت همدلی']
      },
      values: {
        shared: ['خانواده', 'صداقت', 'رشد شخصی'],
        conflicts: ['اولویت‌های مالی', 'سبک زندگی'],
        alignment: 'هماهنگی نسبی در ارزش‌های اصلی'
      },
      future: {
        shortTerm: 'دوره رشد و یادگیری متقابل',
        longTerm: 'پتانسیل قوی برای رابطه پایدار',
        growthAreas: ['مهارت‌های ارتباطی', 'مدیریت تعارض', 'برنامه‌ریزی مشترک']
      }
    };
  }

  private generateBestMatches(birthChart: BirthChart): string[] {
    return ['ثور', 'سرطان', 'عقرب'];
  }

  private generateChallengingMatches(birthChart: BirthChart): string[] {
    return ['جوزا', 'قوس', 'دلو'];
  }

  private generateCompatibilityRecommendations(birthChart: BirthChart): string[] {
    return [
      'تقویت ارتباط عاطفی',
      'درک و پذیرش تفاوت‌ها',
      'ایجاد اهداف مشترک'
    ];
  }

  public generateAnalysis(birthChart: BirthChart): Analysis {
    const relationshipAnalysis = this.generateRelationshipAnalysis(birthChart);
    
    return {
      ascendant: birthChart.chartData.ascendant,
      sunSign: birthChart.chartData.planets.find(p => p.name === 'خورشید')?.sign || 'نامشخص',
      moonSign: birthChart.chartData.planets.find(p => p.name === 'ماه')?.sign || 'نامشخص',
      planets: birthChart.chartData.planets,
      houses: birthChart.chartData.houses,
      aspects: birthChart.chartData.aspects,
      strengths: [
        'توانایی رهبری و هدایت دیگران',
        'خلاقیت و نوآوری در کار',
        'مهارت‌های ارتباطی قوی',
        'درک عمیق از احساسات دیگران',
        'استعداد در حل مسائل پیچیده'
      ],
      challenges: [
        'نیاز به یافتن تعادل بین کار و زندگی شخصی',
        'مدیریت استرس و فشارهای روزمره',
        'تصمیم‌گیری در شرایط سخت',
        'برقراری ارتباط عمیق با دیگران',
        'پذیرش تغییرات ناگهانی'
      ],
      recommendations: [
        {
          area: 'شغلی',
          advice: 'زمان مناسبی برای شروع پروژه‌های جدید است'
        },
        {
          area: 'روابط',
          advice: 'ارتباطات خود را عمیق‌تر کنید'
        },
        {
          area: 'سلامتی',
          advice: 'به استراحت و تمدد اعصاب بیشتر اهمیت دهید'
        }
      ],
      interestAnalysis: {
        'عشق و روابط': 'زمان مناسبی برای تقویت روابط عاطفی است',
        'شغل و حرفه': 'فرصت‌های شغلی جدیدی در راه است',
        'سلامت و تندرستی': 'توجه به سلامت جسمی و روحی در اولویت قرار دارد'
      },
      relationshipAnalysis,
      compatibility: {
        bestMatches: this.generateBestMatches(birthChart),
        challengingMatches: this.generateChallengingMatches(birthChart),
        recommendations: this.generateCompatibilityRecommendations(birthChart)
      }
    };
  }
}

export const astrologyService = new AstrologyService(); 