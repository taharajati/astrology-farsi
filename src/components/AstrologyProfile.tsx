import React from 'react';
import { ChartData, Analysis, BirthInfo } from '../types';

interface AstrologyProfileProps {
  birthInfo: BirthInfo;
  chartData: ChartData;
  analysis: Analysis;
}

const AstrologyProfile: React.FC<AstrologyProfileProps> = ({ birthInfo, chartData, analysis }) => {
  return (
    <div className="space-y-8">
      {/* بخش خلاصه */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">خلاصه پروفایل نجومی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">طالع شما</h3>
            <p className="text-white">{analysis.ascendant}</p>
            <p className="text-purple-200 mt-2">طالع شما نشان‌دهنده شخصیت ظاهری و نحوه برخورد شما با دنیای بیرون است.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">نشانه خورشیدی</h3>
            <p className="text-white">{analysis.sunSign}</p>
            <p className="text-purple-200 mt-2">نشانه خورشیدی بیانگر جوهره شخصیت و هویت درونی شماست.</p>
          </div>
        </div>
      </section>

      {/* بخش سیارات */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">موقعیت سیارات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.planets.map((planet) => (
            <div key={planet.name} className="border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{planet.name}</h3>
              <p className="text-white mb-2">در برج: {planet.sign}</p>
              <p className="text-white mb-2">در خانه: {planet.house}</p>
              <p className="text-purple-200">{planet.interpretation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش خانه‌ها */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">خانه‌های نجومی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.houses.map((house) => (
            <div key={house.number} className="border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">خانه {house.number}</h3>
              <p className="text-white mb-2">برج حاکم: {house.ruler}</p>
              <p className="text-purple-200">{house.interpretation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش جنبه‌ها */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">جنبه‌های مهم</h2>
        <div className="space-y-4">
          {analysis.aspects.map((aspect, index) => (
            <div key={index} className="border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                {aspect.planet1} {aspect.type} {aspect.planet2}
              </h3>
              <p className="text-purple-200">{aspect.interpretation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش تحلیل شخصیتی */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">تحلیل شخصیتی</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">نقاط قوت</h3>
            <ul className="list-disc list-inside text-white space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">چالش‌ها</h3>
            <ul className="list-disc list-inside text-white space-y-2">
              {analysis.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* بخش پیش‌بینی و توصیه‌ها */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">توصیه‌ها و مسیر رشد</h2>
        <div className="space-y-4">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className="border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{rec.area}</h3>
              <p className="text-purple-200">{rec.advice}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش حوزه‌های خاص */}
      <section className="bg-purple-900/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">تحلیل حوزه‌های مورد علاقه</h2>
        <div className="space-y-6">
          {birthInfo.interests.map((interest, index) => (
            <div key={index} className="border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{interest}</h3>
              <p className="text-purple-200">{analysis.interestAnalysis[interest]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AstrologyProfile; 