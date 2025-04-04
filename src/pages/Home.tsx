import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          کشف اسرار وجود خود با ستاره‌شناسی
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          با استفاده از دانش کهن ستاره‌شناسی و هوش مصنوعی، مسیر زندگی خود را بهتر بشناسید
        </p>
        <Link
          to="/birth-chart"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          شروع سفر ستاره‌شناسی
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-purple-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">چارت تولد دقیق</h3>
          <p className="text-gray-300">
            دریافت چارت تولد دقیق با استفاده از تاریخ، ساعت و مکان تولد شما
          </p>
        </div>
        <div className="bg-purple-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">تحلیل شخصیت</h3>
          <p className="text-gray-300">
            تحلیل عمیق شخصیت با استفاده از هوش مصنوعی و دانش ستاره‌شناسی
          </p>
        </div>
        <div className="bg-purple-900/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">راهنمایی مسیر زندگی</h3>
          <p className="text-gray-300">
            دریافت راهنمایی‌های شخصی‌سازی شده برای مسیر شغلی و روابط
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 