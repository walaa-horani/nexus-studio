
import React from 'react';
import { AppView, GeneratedContent, StatItem } from '../types';

interface DashboardProps {
  history: GeneratedContent[];
  onNavigate: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ history, onNavigate }) => {
  const stats: StatItem[] = [
    { label: 'Total Generations', value: history.length + 124, change: '+12%', isPositive: true },
    { label: 'Tokens Used', value: '45.2k', change: '+5%', isPositive: true },
    { label: 'Avg. Response Time', value: '1.2s', change: '-10%', isPositive: true },
    { label: 'Active Projects', value: 8, change: '+1', isPositive: true },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Justin</h1>
          <p className="text-gray-400">Here's what's happening in your studio today.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => onNavigate('content-studio')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            New Text Content
          </button>
          <button 
            onClick={() => onNavigate('image-studio')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20"
          >
            New Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group">
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${stat.isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6">Generations per Day</h3>
            <div className="flex-1 flex items-end justify-between px-4 pb-4">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                  <div 
                    className="w-12 bg-blue-600/30 rounded-t-lg group-hover:bg-blue-600/60 transition-all" 
                    style={{ height: `${h}%` }}
                  ></div>
                  <span className="text-[10px] text-gray-500 mt-2 font-medium uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10">
                    <h4 className="text-blue-400 font-bold text-xl mb-2">Write Blog Post</h4>
                    <p className="text-blue-200/60 text-sm">Generate high-quality SEO optimized articles in seconds.</p>
                </div>
                <div className="absolute top-0 right-0 p-4 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h5M7 12h8M7 16h8" /></svg>
                </div>
             </div>
             <div className="bg-purple-600/5 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10">
                    <h4 className="text-purple-400 font-bold text-xl mb-2">Product Design</h4>
                    <p className="text-purple-200/60 text-sm">Create visual concepts and UI elements instantly.</p>
                </div>
                <div className="absolute top-0 right-0 p-4 text-purple-500/20 group-hover:text-purple-500/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors" onClick={() => onNavigate('history')}>View all</button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    <p className="text-sm">No recent activity detected.</p>
                </div>
            ) : (
                history.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all border border-transparent hover:border-gray-700">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${item.type === 'image' ? 'bg-purple-900/40' : 'bg-blue-900/40'}`}>
                            {item.type === 'image' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                            <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
