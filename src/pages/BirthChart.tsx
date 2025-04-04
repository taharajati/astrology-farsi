import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { astrologyService } from '../services/astrology';
import { BirthInfo, ChartData, Analysis, UserProfile } from '../types';
import { convertPersianToGregorian, isValidPersianDate, formatPersianDateWithDash } from '../utils/dateUtils';
import CitySelector from '../components/CitySelector';

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
      <div className="card shadow-xl shadow-purple-900/20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            محاسبه طالع تولد
          </h1>
          <p className="text-center text-purple-200">
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
            
            <div className="bg-purple-900/30 p-4 rounded-lg space-y-3">
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
                    <span key={interest} className="px-2 py-1 bg-purple-800/50 rounded text-sm">
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
              className="px-6 py-2 rounded-lg bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 transition-colors"
              disabled={loading}
            >
              بازگشت
            </button>
          )}
          
          <button
            onClick={handleNext}
            className={`px-6 py-2 rounded-lg ${
              loading 
                ? 'bg-purple-700 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white transition-colors flex items-center`}
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
          <div className="mt-8 p-4 bg-purple-900/30 rounded-lg">
            <h2 className="text-xl font-bold text-purple-200">جزئیات چارت تولد</h2>
            <p className="text-purple-300">چارت تولد شما نشان‌دهنده موقعیت سیارات و خانه‌ها در زمان تولد شماست.</p>
            <h3 className="text-lg font-semibold text-purple-200 mt-4">سیارات و خانه‌ها</h3>
            <p className="text-purple-300">هر سیاره و خانه در چارت شما معنای خاصی دارد و تأثیرات متفاوتی بر زندگی شما می‌گذارد.</p>
            <h3 className="text-lg font-semibold text-purple-200 mt-4">توصیه‌ها</h3>
            <p className="text-purple-300">بر اساس چارت شما، پیشنهاد می‌شود که به دنبال تعادل در زندگی خود باشید و از فرصت‌های جدید استقبال کنید.</p>
            <h3 className="text-lg font-semibold text-purple-200 mt-4">منابع بیشتر</h3>
            <p className="text-purple-300">برای اطلاعات بیشتر، می‌توانید به کتاب‌ها و منابع آموزشی مرتبط با طالع‌بینى مراجعه کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthChart; 