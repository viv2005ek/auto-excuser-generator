import React from 'react';
import { Sparkles } from 'lucide-react';

interface ExcuseFormProps {
  tone: string;
  setTone: (tone: string) => void;
  context: string;
  setContext: (context: string) => void;
  situation: string;
  setSituation: (situation: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

const ExcuseForm: React.FC<ExcuseFormProps> = ({
  tone, setTone, context, setContext, situation, setSituation, onGenerate, loading
}) => {
  const tones = [
    { value: 'Professional', emoji: '💼', label: 'Professional' },
    { value: 'Funny', emoji: '🤡', label: 'Funny' },
    { value: 'Chaotic', emoji: '🔥', label: 'Chaotic' },
    { value: 'Custom', emoji: '✍️', label: 'Custom' }
  ];

  const contexts = [
    { value: 'School/Work', emoji: '🏢', label: 'School/Work' },
    { value: 'Family Event', emoji: '👨‍👩‍👧‍👦', label: 'Family Event' },
    { value: 'Online Call', emoji: '💻', label: 'Online Call' },
    { value: 'Social Event', emoji: '🎉', label: 'Social Event' },
    { value: 'Other', emoji: '🎯', label: 'Other' }
  ];

  return (
    <div className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-gray-700/50 p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Sparkles className="mr-2 text-violet-400" size={24} />
        Customize Your Escape
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎭 Tone Style
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          >
            {tones.map((t) => (
              <option key={t.value} value={t.value}>
                {t.emoji} {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎯 Excuse Context
          </label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          >
            {contexts.map((c) => (
              <option key={c.value} value={c.value}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          📝 Explain Your Situation
        </label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Briefly describe what's going on…"
          rows={3}
          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 resize-none"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating your alibi…
          </div>
        ) : (
          <>
            <Sparkles className="mr-2" size={20} />
            ✨ Generate Excuse
          </>
        )}
      </button>
    </div>
  );
};

export default ExcuseForm;