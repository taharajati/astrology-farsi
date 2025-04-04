import { useProfile } from '../context/ProfileContext';
import AstrologyProfile from '../components/AstrologyProfile';

export default function Profile() {
  const { profile } = useProfile();

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-purple-200">لطفاً ابتدا اطلاعات تولد خود را وارد کنید.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          پروفایل نجومی {profile.name}
        </h1>
        <p className="text-center text-purple-200 mt-2">
          تحلیل کامل چارت تولد و پیش‌بینی‌های شخصی‌سازی شده
        </p>
      </div>

      <AstrologyProfile
        birthInfo={profile.birthInfo}
        chartData={profile.chartData}
        analysis={profile.analysis}
      />
    </div>
  );
} 