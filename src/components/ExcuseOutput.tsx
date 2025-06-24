import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Volume2, MessageCircle } from 'lucide-react';

interface ExcuseOutputProps {
  excuse: string;
  onRegenerate: () => void;
  loading: boolean;
}

const ExcuseOutput: React.FC<ExcuseOutputProps> = ({ excuse, onRegenerate, loading }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (excuse && excuse !== displayedText) {
      setIsTyping(true);
      setDisplayedText('');
      
      let index = 0;
      const timer = setInterval(() => {
        if (index < excuse.length) {
          setDisplayedText(excuse.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [excuse]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(excuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const speakExcuse = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(excuse);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!excuse && !loading) {
    return null;
  }

  return (
    <div className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-gray-700/50 p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <MessageCircle className="mr-2 text-green-400" size={24} />
        Your Perfect Excuse
      </h2>

      <div className="bg-gray-900/50 rounded-xl p-6 mb-4 min-h-[120px] flex items-center">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mr-3"></div>
            <span className="text-gray-300">Fetching believable lies from the excuse dimension…</span>
          </div>
        ) : (
          <div className="w-full">
            <pre className="text-white text-lg leading-relaxed whitespace-pre-wrap font-sans">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </pre>
          </div>
        )}
      </div>

      {excuse && !loading && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            onClick={onRegenerate}
            className="flex items-center px-4 py-2 bg-violet-600/50 hover:bg-violet-500/50 text-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            <RefreshCw size={16} className="mr-2" />
            Regenerate
          </button>

          <button
            onClick={speakExcuse}
            className="flex items-center px-4 py-2 bg-blue-600/50 hover:bg-blue-500/50 text-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Volume2 size={16} className="mr-2" />
            Speak It
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcuseOutput;