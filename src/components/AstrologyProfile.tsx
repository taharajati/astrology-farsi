import React from 'react';
import { Analysis, ChartData, BirthInfo } from '../types';

interface AstrologyProfileProps {
  chartData: ChartData;
  analysis: Analysis;
  birthInfo: BirthInfo;
}

const AstrologyProfile = ({ chartData, analysis, birthInfo }: AstrologyProfileProps) => {
  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="card">
        <h2 className="section-title mb-6">خلاصه چارت تولد</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-2">طالع</h3>
            <p className="text-2xl font-bold text-white">{chartData.ascendant}</p>
            <p className="text-sm text-purple-400 mt-2">نشانگر ظاهر و شخصیت بیرونی شما</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-2">خورشید</h3>
            <p className="text-2xl font-bold text-white">{chartData.sunSign}</p>
            <p className="text-sm text-purple-400 mt-2">نشانگر هویت و شخصیت اصلی شما</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-2">ماه</h3>
            <p className="text-2xl font-bold text-white">{chartData.moonSign}</p>
            <p className="text-sm text-purple-400 mt-2">نشانگر احساسات و نیازهای درونی شما</p>
          </div>
        </div>
      </div>

      {/* Personality Analysis */}
      <div className="card">
        <h2 className="section-title mb-6">تحلیل شخصیت</h2>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
          <p className="text-purple-200 leading-relaxed">{analysis.personality}</p>
        </div>
      </div>

      {/* Relationships */}
      <div className="card">
        <h2 className="section-title mb-6">روابط</h2>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
          <p className="text-purple-200 leading-relaxed">{analysis.relationships}</p>
        </div>
      </div>

      {/* Career */}
      <div className="card">
        <h2 className="section-title mb-6">شغل و حرفه</h2>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
          <p className="text-purple-200 leading-relaxed">{analysis.career}</p>
        </div>
      </div>

      {/* Life Path */}
      <div className="card">
        <h2 className="section-title mb-6">مسیر زندگی</h2>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
          <p className="text-purple-200 leading-relaxed">{analysis.lifePath}</p>
        </div>
      </div>

      {/* Strengths and Challenges */}
      <div className="card">
        <h2 className="section-title mb-6">نقاط قوت و چالش‌ها</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4">نقاط قوت</h3>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-purple-200">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4">چالش‌ها</h3>
            <ul className="space-y-3">
              {analysis.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-purple-200">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="section-title mb-6">توصیه‌ها</h2>
        <div className="space-y-4">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-purple-300">{rec.title}</h3>
                <span className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                  {rec.priority}
                </span>
              </div>
              <p className="text-purple-200 leading-relaxed">{rec.description}</p>
              {rec.timeframe && (
                <p className="text-sm text-purple-400 mt-3">
                  زمان پیشنهادی: {rec.timeframe}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="card">
        <h2 className="section-title mb-6">تحلیل جزئیات</h2>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4">سیارات</h3>
            <div className="space-y-4">
              {chartData.planets.map((planet) => (
                <div key={planet.name} className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <span className="text-purple-200 font-medium">{planet.name}</span>
                  <span className="text-purple-300">{planet.sign} در خانه {planet.house}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4">خانه‌ها</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chartData.houses.map((house) => (
                <div key={house.number} className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <span className="text-purple-200 font-medium">خانه {house.number}</span>
                  <span className="text-purple-300">{house.sign}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4">جنبه‌های مهم</h3>
            <div className="space-y-4">
              {chartData.aspects.map((aspect, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-purple-200 font-medium">{aspect.planet1}</span>
                    <span className="mx-2 text-purple-400">-</span>
                    <span className="text-purple-200 font-medium">{aspect.planet2}</span>
                  </div>
                  <span className="badge bg-purple-900/50 text-purple-200 border border-purple-500/30">
                    {aspect.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologyProfile; 