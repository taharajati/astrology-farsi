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
  lifePath: 'مسیر زندگی شما با خلاقیت و بیان فردیت گره خورده است. با توجه به قرارگیری خورشید در برج اسد و ماه در برج دلو، شما فردی مستقل و نوآور هستید که می‌تواند در زمینه‌های هنری و خلاقانه موفقیت‌های چشمگیری کسب کند.',
  strengths: ['خلاقیت', 'استقلال', 'عدالت‌طلبی', 'وفاداری'],
  challenges: ['خودرایی', 'حساسیت بیش از حد', 'وسواس در کمال‌طلبی', 'مشکل در پذیرش انتقاد'],
  recommendations: [
    {
      title: 'توسعه مهارت‌های خلاقانه',
      description: 'با توجه به استعداد ذاتی شما در خلاقیت، پیشنهاد می‌شود در زمینه‌های هنری و خلاقانه فعالیت بیشتری داشته باشید.',
      priority: 'بالا',
      timeframe: '3-6 ماه آینده'
    },
    {
      title: 'مدیریت احساسات',
      description: 'با توجه به حساسیت بالای شما، یادگیری تکنیک‌های مدیریت احساسات می‌تواند به بهبود روابط شما کمک کند.',
      priority: 'متوسط',
      timeframe: '1-3 ماه آینده'
    },
    {
      title: 'توسعه روابط اجتماعی',
      description: 'با توجه به استعداد شما در برقراری ارتباط، پیشنهاد می‌شود در فعالیت‌های گروهی و اجتماعی بیشتر شرکت کنید.',
      priority: 'پایین',
      timeframe: '6-12 ماه آینده'
    }
  ],
  detailedAnalysis: {
    planets: [
      'خورشید در برج اسد نشان‌دهنده‌ی خلاقیت و اعتماد به نفس بالاست',
      'ماه در برج دلو نشان‌دهنده‌ی استقلال و نوآوری است',
      'عطارد در برج سنبله نشان‌دهنده‌ی دقت و تحلیل‌گری است'
    ],
    houses: [
      'خانه اول (طالع) در برج میزان نشان‌دهنده‌ی تعادل و عدالت‌طلبی است',
      'خانه پنجم در برج اسد نشان‌دهنده‌ی خلاقیت و بیان فردیت است',
      'خانه دهم در برج دلو نشان‌دهنده‌ی استقلال و نوآوری در مسیر شغلی است'
    ],
    aspects: [
      'تریل بین خورشید و ماه نشان‌دهنده‌ی هماهنگی بین هویت و احساسات است',
      'مربع بین خورشید و عطارد نشان‌دهنده‌ی چالش در بیان افکار است',
      'مقارنه بین ماه و زهره نشان‌دهنده‌ی عاطفه و احساسات قوی است'
    ]
  }
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
    const { ascendant, planets, houses, aspects } = chartData;
    
    // تحلیل شخصیت بر اساس طالع و خورشید
    const sunPlanet = planets.find(p => p.name === 'خورشید');
    const moonPlanet = planets.find(p => p.name === 'ماه');
    const mercuryPlanet = planets.find(p => p.name === 'عطارد');
    const venusPlanet = planets.find(p => p.name === 'زهره');
    const marsPlanet = planets.find(p => p.name === 'مریخ');

    const personalityTraits = this.analyzePersonalityTraits(ascendant, sunPlanet, moonPlanet);
    const emotionalNature = this.analyzeEmotionalNature(moonPlanet, venusPlanet);
    const communicationStyle = this.analyzeCommunicationStyle(mercuryPlanet);
    const relationships = this.analyzeRelationships(venusPlanet, marsPlanet, aspects);
    const careerPotential = this.analyzeCareerPotential(sunPlanet, houses[9], aspects);
    const lifeDestiny = this.analyzeLifeDestiny(houses, aspects);
    
    return {
      personality: `${personalityTraits}\n\n${emotionalNature}\n\n${communicationStyle}`,
      relationships,
      career: careerPotential,
      lifeDestiny,
      strengths: this.analyzeStrengths(planets, aspects),
      challenges: this.analyzeChallenges(planets, aspects),
      recommendations: this.generateRecommendations(chartData),
      detailedAnalysis: {
        planets: planets.map(p => p.interpretation),
        houses: houses.map(h => h.interpretation),
        aspects: aspects.map(a => a.interpretation)
      }
    };
  }

  private analyzePersonalityTraits(ascendant: string, sun: Planet, moon: Planet): string {
    const traits = {
      'حمل': 'پرانرژی و پیشگام',
      'ثور': 'با ثبات و عملگرا',
      'جوزا': 'کنجکاو و سازگار',
      'سرطان': 'احساساتی و مراقب',
      'اسد': 'خلاق و با اعتماد به نفس',
      'سنبله': 'دقیق و منظم',
      'میزان': 'دیپلمات و عادل',
      'عقرب': 'عمیق و مرموز',
      'قوس': 'ماجراجو و خوش‌بین',
      'جدی': 'مسئول و جاه‌طلب',
      'دلو': 'مستقل و نوآور',
      'حوت': 'شهودی و همدل'
    };

    return `شخصیت شما ترکیبی پویا از سه عنصر کلیدی است:
    
۱. طالع ${ascendant} شما که نشان‌دهنده ${traits[ascendant]} بودن شماست و در نحوه برخورد اولیه دیگران با شما تأثیر می‌گذارد.

۲. خورشید در ${sun.sign} که نشان‌دهنده جوهره اصلی شخصیت شماست و بیانگر ${traits[sun.sign]} بودن ذات شماست.

۳. ماه در ${moon.sign} که نمایانگر احساسات درونی شما و نشان‌دهنده ${traits[moon.sign]} بودن در لایه‌های عمیق‌تر شخصیتی شماست.

این ترکیب منحصر به فرد باعث می‌شود که شما فردی ${traits[ascendant]}، با ذاتی ${traits[sun.sign]} و احساساتی ${traits[moon.sign]} باشید.`;
  }

  private analyzeEmotionalNature(moon: Planet, venus: Planet): string {
    return `در زمینه احساسات و عواطف:

۱. ماه در ${moon.sign} و خانه ${moon.house} نشان می‌دهد که شما در لایه عمیق احساسی خود ${moon.interpretation}

۲. زهره در ${venus.sign} و خانه ${venus.house} بیانگر این است که در روابط عاطفی ${venus.interpretation}

این ترکیب نشان می‌دهد که شما در روابط عاطفی به دنبال امنیت و درک متقابل هستید، و توانایی خاصی در درک احساسات دیگران دارید.`;
  }

  private analyzeCommunicationStyle(mercury: Planet): string {
    const styles = {
      'حمل': 'مستقیم و رک',
      'ثور': 'آرام و متفکر',
      'جوزا': 'پویا و انعطاف‌پذیر',
      'سرطان': 'همدلانه و حساس',
      'اسد': 'گرم و تأثیرگذار',
      'سنبله': 'تحلیلی و دقیق',
      'میزان': 'دیپلماتیک و متعادل',
      'عقرب': 'نافذ و عمیق',
      'قوس': 'صریح و فلسفی',
      'جدی': 'ساختارمند و جدی',
      'دلو': 'خلاقانه و نوآورانه',
      'حوت': 'شهودی و هنری'
    };

    return `در زمینه ارتباطات و تفکر:

عطارد در ${mercury.sign} و خانه ${mercury.house} نشان می‌دهد که سبک ارتباطی شما ${styles[mercury.sign]} است.
${mercury.interpretation}

این موقعیت نشان می‌دهد که شما در برقراری ارتباط و انتقال افکار خود توانایی خاصی دارید و می‌توانید به خوبی با دیگران تعامل کنید.`;
  }

  private analyzeRelationships(venus: Planet, mars: Planet, aspects: Aspect[]): string {
    const venusAspects = aspects.filter(a => a.planet1 === 'زهره' || a.planet2 === 'زهره');
    const marsAspects = aspects.filter(a => a.planet1 === 'مریخ' || a.planet2 === 'مریخ');

    return `در زمینه روابط و عشق:

۱. زهره در ${venus.sign} نشان می‌دهد که شما در روابط عاطفی ${venus.interpretation}

۲. مریخ در ${mars.sign} بیانگر این است که در ابراز عشق و جذب دیگران ${mars.interpretation}

${venusAspects.map(a => a.interpretation).join('\n')}

${marsAspects.map(a => a.interpretation).join('\n')}

این ترکیب نشان می‌دهد که شما در روابط به دنبال تعادل بین عشق و استقلال هستید.`;
  }

  private analyzeCareerPotential(sun: Planet, tenthHouse: House, aspects: Aspect[]): string {
    const careerAspects = aspects.filter(a => 
      (a.planet1 === 'خورشید' || a.planet2 === 'خورشید') ||
      (a.planet1 === 'زحل' || a.planet2 === 'زحل')
    );

    return `در زمینه شغل و حرفه:

۱. خورشید در ${sun.sign} و خانه ${sun.house} نشان می‌دهد که مسیر شغلی شما ${sun.interpretation}

۲. خانه دهم در ${tenthHouse.sign} با حاکمیت ${tenthHouse.ruler} نشان‌دهنده ${tenthHouse.interpretation}

${careerAspects.map(a => a.interpretation).join('\n')}

این ترکیب نشان می‌دهد که شما استعداد خاصی در زمینه‌های [حوزه‌های کاری مرتبط] دارید و می‌توانید در این مسیرها موفق شوید.`;
  }

  private analyzeLifeDestiny(houses: House[], aspects: Aspect[]): string {
    const ninthHouse = houses[8]; // خانه نهم - فلسفه و معنا
    const twelfthHouse = houses[11]; // خانه دوازدهم - معنویت
    
    return `در زمینه مسیر زندگی و سرنوشت:

۱. خانه نهم در ${ninthHouse.sign} نشان می‌دهد که ${ninthHouse.interpretation}

۲. خانه دوازدهم در ${twelfthHouse.sign} بیانگر این است که ${twelfthHouse.interpretation}

این ترکیب نشان می‌دهد که مسیر زندگی شما به سمت [جهت‌گیری کلی زندگی] است و می‌توانید در این مسیر به رشد و تعالی برسید.`;
  }

  private analyzeStrengths(planets: Planet[], aspects: Aspect[]): string[] {
    const strengths = new Set<string>();
    
    // تحلیل قوت‌ها بر اساس موقعیت سیارات
    planets.forEach(planet => {
      if (planet.house === 1 || planet.house === 10) {
        strengths.add(`توانایی رهبری و هدایت در زمینه ${planet.name}`);
      }
      if (planet.house === 2 || planet.house === 8) {
        strengths.add(`استعداد در مدیریت منابع و دارایی‌ها`);
      }
      if (planet.house === 3 || planet.house === 9) {
        strengths.add(`توانایی یادگیری و درک عمیق مفاهیم`);
      }
    });

    // تحلیل قوت‌ها بر اساس جنبه‌های مثبت
    aspects.forEach(aspect => {
      if (aspect.type === 'مثلث' || aspect.type === 'تسدیس') {
        strengths.add(`هماهنگی بین ${aspect.planet1} و ${aspect.planet2}`);
      }
    });

    return Array.from(strengths);
  }

  private analyzeChallenges(planets: Planet[], aspects: Aspect[]): string[] {
    const challenges = new Set<string>();
    
    // تحلیل چالش‌ها بر اساس موقعیت سیارات
    planets.forEach(planet => {
      if (planet.house === 12 || planet.house === 6) {
        challenges.add(`نیاز به توجه بیشتر به سلامتی و تعادل در زمینه ${planet.name}`);
      }
      if (planet.house === 8) {
        challenges.add(`چالش‌های تحول و تغییر در زمینه ${planet.name}`);
      }
    });

    // تحلیل چالش‌ها بر اساس جنبه‌های سخت
    aspects.forEach(aspect => {
      if (aspect.type === 'مربع' || aspect.type === 'مقابله') {
        challenges.add(`تنش بین ${aspect.planet1} و ${aspect.planet2}`);
      }
    });

    return Array.from(challenges);
  }

  private generateRecommendations(chartData: ChartData): Recommendation[] {
    const { planets, houses, aspects } = chartData;
    const recommendations: Recommendation[] = [];

    // توصیه‌های کلی بر اساس موقعیت سیارات
    planets.forEach(planet => {
      if (planet.house === 1 || planet.house === 10) {
        recommendations.push({
          area: 'شخصی',
          suggestion: `تقویت جنبه‌های رهبری و مدیریتی در زمینه ${planet.name}`,
          priority: 'بالا'
        });
      }
    });

    // توصیه‌های مرتبط با خانه‌ها
    houses.forEach(house => {
      if (house.number === 6) {
        recommendations.push({
          area: 'سلامتی',
          suggestion: 'توجه بیشتر به سلامت جسمی و روانی',
          priority: 'متوسط'
        });
      }
    });

    // توصیه‌های مرتبط با جنبه‌ها
    aspects.forEach(aspect => {
      if (aspect.type === 'مربع') {
        recommendations.push({
          area: 'چالش‌ها',
          suggestion: `کار روی تعادل بین ${aspect.planet1} و ${aspect.planet2}`,
          priority: 'بالا'
        });
      }
    });

    return recommendations;
  }
}

export const astrologyService = new AstrologyService(); 