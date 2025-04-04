import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="section-title mb-6">
            کشف اسرار طالع خود با طالع‌بینى دقیق
          </h1>
          <p className="section-subtitle mb-8">
            با استفاده از تکنولوژی پیشرفته و دانش کهن طالع‌بینى، مسیر زندگی خود را بهتر بشناسید
          </p>
          <Link to="/birth-chart" className="btn-primary text-lg px-8 py-3">
            شروع سفر طالع‌بینى
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">ویژگی‌های منحصر به فرد</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="astro-card p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-2">طالع دقیق</h3>
              <p className="text-purple-300">
                محاسبات دقیق بر اساس زمان و مکان تولد شما، با پشتیبانی از تقویم شمسی و میلادی
              </p>
            </div>

            {/* Feature 2 */}
            <div className="astro-card p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-2">تحلیل شخصیت</h3>
              <p className="text-purple-300">
                تحلیل عمیق شخصیت بر اساس موقعیت سیارات و خانه‌ها در چارت تولد شما
              </p>
            </div>

            {/* Feature 3 */}
            <div className="astro-card p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-2">راهنمایی زندگی</h3>
              <p className="text-purple-300">
                توصیه‌های شخصی‌سازی شده برای بهبود روابط، شغل و مسیر زندگی شما
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">چگونه کار می‌کند؟</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">۱</span>
              </div>
              <div className="mr-4">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">اطلاعات تولد</h3>
                <p className="text-purple-300">
                  اطلاعات دقیق زمان و مکان تولد خود را وارد کنید. سیستم از تقویم شمسی و میلادی پشتیبانی می‌کند.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">۲</span>
              </div>
              <div className="mr-4">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">محاسبه چارت</h3>
                <p className="text-purple-300">
                  سیستم به صورت خودکار چارت تولد شما را محاسبه می‌کند و موقعیت دقیق سیارات و خانه‌ها را مشخص می‌کند.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">۳</span>
              </div>
              <div className="mr-4">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">تحلیل و توصیه</h3>
                <p className="text-purple-300">
                  تحلیل کامل شخصیت، روابط، شغل و مسیر زندگی شما به همراه توصیه‌های کاربردی ارائه می‌شود.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/birth-chart" className="btn-primary text-lg px-8 py-3">
              شروع کنید
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 