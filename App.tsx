
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ContentStudio } from './components/ContentStudio';
import { ImageStudio } from './components/ImageStudio';
import { AppView, GeneratedContent } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  const addHistoryItem = useCallback((item: GeneratedContent) => {
    setHistory(prev => [item, ...prev]);
  }, []);
  //////comment
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard history={history} onNavigate={setActiveView} />;
      case 'content-studio':
        return <ContentStudio onGenerated={(content) => addHistoryItem(content)} />;
      case 'image-studio':
        return <ImageStudio onGenerated={(content) => addHistoryItem(content)} />;
      case 'history':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Activity History</h1>
            <div className="grid gap-4">
              {history.length === 0 ? (
                <p className="text-gray-500">No activity yet. Start creating!</p>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.timestamp.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.type === 'image' ? 'bg-purple-900/40 text-purple-300' : 'bg-red-900/40 text-red-300'}`}>
                      {item.type}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      default:
        return <div className="p-8">Coming Soon</div>;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
