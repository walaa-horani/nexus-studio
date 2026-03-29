
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface ContentStudioProps {
  onGenerated: (item: GeneratedContent) => void;
}

export const ContentStudio: React.FC<ContentStudioProps> = ({ onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const text = await generateText(prompt);
      if (text) {
        setResult(text);
        onGenerated({
          id: Math.random().toString(36).substr(2, 9),
          title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
          type: 'text',
          content: text,
          timestamp: new Date()
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Content Studio</h1>
        <p className="text-gray-400">Generate high-quality copy, blog posts, or code in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="space-y-6 flex flex-col">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col flex-1">
            <label className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. Write a 300-word blog post about the future of AI in web development..."
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none"
            />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-gray-800 text-xs font-medium rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700">Casual</button>
                <button className="px-3 py-1.5 bg-gray-800 text-xs font-medium rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700">Professional</button>
                <button className="px-3 py-1.5 bg-gray-800 text-xs font-medium rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700">Creative</button>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg shadow-red-500/20"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-900/20 border border-red-900/40 p-4 rounded-xl text-red-400 text-sm flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Generated Content</h3>
            <button 
              className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
              disabled={!result}
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert("Copied to clipboard!");
              }}
            >
              Copy to clipboard
            </button>
          </div>
          <div className="flex-1 bg-gray-950 border border-gray-800 rounded-2xl p-6 text-gray-300 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
            {result ? (
              <pre className="whitespace-pre-wrap">{result}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p>Your content will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
