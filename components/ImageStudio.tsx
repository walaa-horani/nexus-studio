
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface ImageStudioProps {
  onGenerated: (item: GeneratedContent) => void;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<any>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      if (imageUrl) {
        setResult(imageUrl);
        onGenerated({
          id: Math.random().toString(36).substr(2, 9),
          title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
          type: 'image',
          content: imageUrl,
          timestamp: new Date()
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const ratios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Image Studio</h1>
          <p className="text-gray-400">Transform your ideas into high-fidelity visuals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-3 block uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {ratios.map(r => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      aspectRatio === r 
                        ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-400 mb-3 block uppercase tracking-wider">Visual Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic cyber-city with neon signs, cinematic lighting, 8k resolution..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none h-40"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl shadow-purple-500/30"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Dreaming...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11l-8.414 8.414c-.49.49-1.286.49-1.776 0l-4.243-4.243c-.49-.49-.49-1.286 0-1.776L13 5m6 6l-6-6m6 6l-6 6" /></svg>
                  <span>Generate Masterpiece</span>
                </>
              )}
            </button>

            {error && (
              <p className="text-red-400 text-xs bg-red-900/10 border border-red-900/30 p-3 rounded-lg">{error}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 min-h-[600px] flex items-center justify-center overflow-hidden relative group">
            <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-bold text-purple-400 border border-purple-500/20 uppercase tracking-widest">
              Preview Canvas
            </div>
            
            {result ? (
              <div className="relative w-full h-full flex items-center justify-center group/img">
                <img 
                  src={result} 
                  alt="AI Generated" 
                  className="max-w-full max-h-full rounded-2xl shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.02]" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <a href={result} download="nexus-ai-generation.png" className="p-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </a>
                  <button className="p-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors" onClick={() => setResult(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 max-w-sm">
                <div className="w-20 h-20 bg-gray-800 rounded-3xl mx-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">No Visual Generated</h3>
                  <p className="text-gray-500 text-sm">Enter a prompt and select an aspect ratio to begin the generation process.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-gray-800/30 rounded-xl border border-gray-800 border-dashed"></div>
                    <div className="h-32 bg-gray-800/30 rounded-xl border border-gray-800 border-dashed"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
