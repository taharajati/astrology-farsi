import { useProfile } from '../context/ProfileContext';
import AstrologyProfile from '../components/AstrologyProfile';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { profile } = useProfile();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="section-title mb-4">اطلاعات تولد یافت نشد</h2>
            <p className="text-purple-300 mb-8">برای مشاهده طالع شخصی خود، لطفاً اطلاعات تولد خود را وارد کنید.</p>
            <Link to="/birth-chart" className="btn-primary text-lg px-8 py-3">
              ورود اطلاعات تولد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-900/30">
              {profile.name.charAt(0)}
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <h1 className="section-title mb-2">{profile.name}</h1>
              <p className="section-subtitle mb-4">پروفایل طالع‌بینى شخصی</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <div className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                  <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {profile.birthInfo.birthDate}
                  <span className="text-xs text-purple-400 mr-1">({profile.birthInfo.calendarType === 'persian' ? 'شمسی' : 'میلادی'})</span>
                </div>
                
                <div className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                  <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {profile.birthInfo.birthTime}
                </div>
                
                <div className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                  <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.birthInfo.birthPlace}
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.birthInfo.interests.map((interest, index) => (
                  <span key={index} className="badge bg-purple-900/30 text-purple-300 border border-purple-500/20">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:ml-auto">
              <Link to="/birth-chart" className="btn-secondary flex items-center">
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                ویرایش اطلاعات
              </Link>
            </div>
          </div>
        </div>
        
        <AstrologyProfile 
          chartData={profile.chartData} 
          analysis={profile.analysis} 
          birthInfo={profile.birthInfo} 
        />
      </div>
    </div>
  );
};

export default Profile; 