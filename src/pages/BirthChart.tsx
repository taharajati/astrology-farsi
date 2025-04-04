import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { astrologyService } from '../services/astrology';
import { BirthInfo, ChartData, Analysis, UserProfile } from '../types';
import { convertPersianToGregorian, isValidPersianDate, formatPersianDateWithDash } from '../utils/dateUtils';
import CitySelector from '../components/CitySelector';
import { Link } from 'react-router-dom';

const BirthChart = () => {
  const navigate = useNavigate();
  const { setProfile } = useProfile();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<BirthInfo>>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    calendarType: 'persian', // Default to Persian calendar
    interests: [],
  });
  
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  
  const interestOptions = [
    'عشق و روابط',
    'شغل و حرفه',
    'سلامت و تندرستی',
    'مسافرت و مهاجرت',
    'تحصیلات و یادگیری',
    'روحانی و معنوی',
    'مالی و ثروت',
    'خانواده و فرزندان',
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const currentInterests = prev.interests || [];
      const updatedInterests = currentInterests.includes(interest)
        ? currentInterests.filter(i => i !== interest)
        : [...currentInterests, interest];
      
      return { ...prev, interests: updatedInterests };
    });
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return false;
    }
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.interests || formData.interests.length === 0) {
      setError('لطفاً حداقل یک حوزه مورد علاقه را انتخاب کنید');
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    setError(null);
    
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Convert Persian date to Gregorian if needed
      let birthDate = formData.birthDate || '';
      if (formData.calendarType === 'persian') {
        const [year, month, day] = birthDate.split('-').map(Number);
        const gregorianDate = convertPersianToGregorian(year, month, day);
        birthDate = formatPersianDateWithDash(gregorianDate);
      }
      
      const birthInfo: BirthInfo = {
        name: formData.name || '',
        birthDate,
        birthTime: formData.birthTime || '',
        birthPlace: formData.birthPlace || '',
        calendarType: formData.calendarType || 'persian',
        interests: formData.interests || [],
      };
      
      const chart = await astrologyService.calculateBirthChart(birthInfo);
      const analysisResult = await astrologyService.generateAnalysis(chart, birthInfo);
      
      setChartData(chart);
      setAnalysis(analysisResult);
      
      // Save to profile context
      const profile: UserProfile = {
        id: Date.now().toString(),
        name: birthInfo.name || 'کاربر',
        birthInfo,
        chartData: chart,
        analysis: analysisResult,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setProfile(profile);
      
      // Navigate to profile page
      navigate('/profile');
    } catch (err) {
      setError('خطایی در محاسبه طالع رخ داد. لطفاً دوباره تلاش کنید.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <div className="mb-8">
          <h1 className="section-title">محاسبه طالع تولد</h1>
          <p className="section-subtitle">
            اطلاعات تولد خود را وارد کنید تا طالع شخصی شما محاسبه شود
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/30 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                  s <= step ? 'bg-purple-500' : 'bg-purple-900/30'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-purple-200">
            <span className={step >= 1 ? 'text-purple-400 font-medium' : ''}>اطلاعات شخصی</span>
            <span className={step >= 2 ? 'text-purple-400 font-medium' : ''}>علایق</span>
            <span className={step >= 3 ? 'text-purple-400 font-medium' : ''}>تایید</span>
          </div>
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-purple-200 mb-2">نام</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-primary"
                placeholder="نام خود را وارد کنید"
              />
            </div>
            
            <div>
              <label className="block text-purple-200 mb-2">نوع تقویم</label>
              <select
                name="calendarType"
                value={formData.calendarType}
                onChange={handleInputChange}
                className="input-primary"
              >
                <option value="persian">شمسی</option>
                <option value="gregorian">میلادی</option>
              </select>
            </div>
            
            <div>
              <label className="block text-purple-200 mb-2">تاریخ تولد</label>
              <input
                type={formData.calendarType === 'persian' ? 'text' : 'date'}
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="input-primary"
                dir="rtl"
                placeholder={formData.calendarType === 'persian' ? 'مثال: ۱۳۸۰-۰۱-۰۱' : ''}
              />
            </div>
            
            <div>
              <label className="block text-purple-200 mb-2">ساعت تولد</label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleInputChange}
                className="input-primary"
                dir="ltr"
              />
            </div>
            
            <div>
              <label className="block text-purple-200 mb-2">محل تولد</label>
              <CitySelector
                value={formData.birthPlace}
                onChange={(value) => setFormData(prev => ({ ...prev, birthPlace: value }))}
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h3 className="text-xl font-medium mb-4 text-purple-200">حوزه‌های مورد علاقه</h3>
            <p className="text-purple-300 mb-6">مواردی که می‌خواهید در تحلیل طالع شما مورد توجه قرار گیرد را انتخاب کنید:</p>
            
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.interests?.includes(interest)
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : 'bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/50'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-purple-200">تایید اطلاعات</h3>
            
            <div className="astro-card space-y-3">
              <div>
                <span className="text-purple-300">نام:</span>
                <span className="text-white mr-2">{formData.name}</span>
              </div>
              <div>
                <span className="text-purple-300">تاریخ تولد:</span>
                <span className="text-white mr-2">{formData.birthDate}</span>
                <span className="text-xs text-purple-300">({formData.calendarType === 'persian' ? 'شمسی' : 'میلادی'})</span>
              </div>
              <div>
                <span className="text-purple-300">ساعت تولد:</span>
                <span className="text-white mr-2">{formData.birthTime}</span>
              </div>
              <div>
                <span className="text-purple-300">محل تولد:</span>
                <span className="text-white mr-2">{formData.birthPlace}</span>
              </div>
              <div>
                <span className="text-purple-300">حوزه‌های مورد علاقه:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.interests?.map((interest) => (
                    <span key={interest} className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-200">
                با کلیک روی دکمه "محاسبه طالع" موافقت می‌کنید که اطلاعات شما برای محاسبه طالع شخصی استفاده شود.
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="btn-secondary"
              disabled={loading}
            >
              بازگشت
            </button>
          )}
          
          <button
            onClick={handleNext}
            className={`${
              loading 
                ? 'bg-purple-700 cursor-not-allowed' 
                : 'btn-primary'
            } flex items-center`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال محاسبه...
              </>
            ) : step < 3 ? (
              'بعدی'
            ) : (
              'محاسبه طالع'
            )}
          </button>
        </div>
        
        {chartData && (
          <div className="mt-8">
            <div className="card mb-8">
              <h2 className="section-title">جزئیات چارت تولد</h2>
              <p className="section-subtitle mb-6">چارت تولد شما نشان‌دهنده موقعیت سیارات و خانه‌ها در زمان تولد شماست.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="astro-card p-4 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-1">طالع صعودی</h3>
                  <p className="text-purple-300">{chartData.ascendant}</p>
                </div>
                
                <div className="astro-card p-4 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-1">خورشید</h3>
                  <p className="text-purple-300">{chartData.planets.find(p => p.name === 'خورشید')?.sign || 'نامشخص'}</p>
                </div>
                
                <div className="astro-card p-4 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-1">ماه</h3>
                  <p className="text-purple-300">{chartData.planets.find(p => p.name === 'ماه')?.sign || 'نامشخص'}</p>
                </div>
              </div>
            </div>
            
            <div className="card mb-8">
              <h2 className="section-title">سیارات و خانه‌ها</h2>
              <p className="section-subtitle mb-6">موقعیت سیارات و خانه‌ها در چارت تولد شما</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="astro-card">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    سیارات
                  </h3>
                  <div className="space-y-2">
                    {chartData.planets.map((planet, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition-colors">
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-sm text-white mr-3">
                            {index + 1}
                          </span>
                          <span className="text-purple-200 font-medium">{planet.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-purple-300 block">{planet.sign}</span>
                          <span className="text-xs text-purple-400">خانه {planet.house}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="astro-card">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    خانه‌ها
                  </h3>
                  <div className="space-y-2">
                    {chartData.houses.map((house, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition-colors">
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-sm text-white mr-3">
                            {house.number}
                          </span>
                          <span className="text-purple-200 font-medium">خانه {house.number}</span>
                        </div>
                        <span className="text-purple-300">{house.sign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card mb-8">
              <h2 className="section-title">جنبه‌های مهم</h2>
              <p className="section-subtitle mb-6">ارتباطات بین سیارات در چارت تولد شما</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chartData.aspects.map((aspect, index) => (
                  <div key={index} className="astro-card p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-sm text-white mr-3">
                          {index + 1}
                        </span>
                        <span className="text-purple-200 font-medium">{aspect.planet1} - {aspect.planet2}</span>
                      </div>
                      <span className={`badge ${
                        aspect.type.includes('مثلث') ? 'bg-green-900/50 text-green-200 border-green-500/30' :
                        aspect.type.includes('مربع') ? 'bg-red-900/50 text-red-200 border-red-500/30' :
                        aspect.type.includes('مقابل') ? 'bg-yellow-900/50 text-yellow-200 border-yellow-500/30' :
                        'bg-purple-900/50 text-purple-200 border-purple-500/30'
                      }`}>
                        {aspect.type}
                      </span>
                    </div>
                    <p className="text-purple-300 text-sm">{aspect.interpretation}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <h2 className="section-title">توصیه‌های شخصی</h2>
              <p className="section-subtitle mb-6">بر اساس چارت شما، پیشنهاد می‌شود که:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="astro-card p-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">روابط</h3>
                  <p className="text-purple-300">در روابط خود صادق و وفادار باشید و به احساسات دیگران احترام بگذارید.</p>
                </div>
                
                <div className="astro-card p-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">شغل</h3>
                  <p className="text-purple-300">برای پیشرفت شغلی، مهارت‌های خود را توسعه دهید و فرصت‌های جدید را امتحان کنید.</p>
                </div>
                
                <div className="astro-card p-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">سلامت</h3>
                  <p className="text-purple-300">به سلامت جسمی و روحی خود توجه کنید و از استرس‌های غیرضروری دوری کنید.</p>
                </div>
              </div>
              
              <div className="astro-card p-4 mb-6">
                <h3 className="text-lg font-semibold text-purple-200 mb-3">توصیه‌های کلی</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-400 ml-2">•</span>
                    <span className="text-purple-300">به دنبال تعادل در زندگی خود باشید و از فرصت‌های جدید استقبال کنید.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 ml-2">•</span>
                    <span className="text-purple-300">در تصمیم‌گیری‌های مهم، به شهود خود اعتماد کنید.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 ml-2">•</span>
                    <span className="text-purple-300">برای رشد شخصی، به مطالعه و یادگیری ادامه دهید.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link to="/profile" className="btn-primary text-lg px-8 py-3">
                  مشاهده تحلیل کامل
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthChart; 