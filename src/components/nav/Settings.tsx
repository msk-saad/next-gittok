import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { FeedType } from '../../lib/github';


const programming_languages = ['JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'C#',
  'Objective-C',
  'Scala',
  'Haskell',
  'Erlang',
  'Elixir',
  'Clojure',
  'Groovy',
  'VimL',
  'Lua',
  'Perl',
] as const;

export type programmingLanguage = (typeof programming_languages)[number] | null;

interface settingsProps {
  onClose: () => void;
  onSave: (language: string, token: string, feedType: FeedType,) => void;
  initialLanguage?: string;
  initialToken?: string;
  initialFeedType?: FeedType;
  error?: string;
  onRefresh: () => void;
}

export default function Settings(props: settingsProps) {

  const { onClose, onSave, initialLanguage, initialToken, initialFeedType, error, onRefresh } = props;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage ?? '');
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(
    initialFeedType ?? 'random'
  );
  const [token, setToken] = useState<string>(initialToken ?? '');

  const handleSave = () => {
    onSave(selectedLanguage, token, selectedFeedType);
    onRefresh();
    onClose();
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50' onClick={onClose}>
      <div className='bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-md mx-6 overflow-hidden'
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 100px 20px rgba(0, 0, 0, 0.15)',
        }}>
        <div className='px-6 py-4 border-b border-white/10 flex justify-between items-center'>
          <h2 className='text-xl font-semibold bg-gradient-to-br from-white to-white/70 text-transparent bg-clip-text'>
            Settings
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-white/10 transition-colors -mr-2'
          >
            <X className='w-4 h-4 text-white/70' />
          </button>
        </div>

        <div className='p-6'>
          <div className='space-y-4'>
            {error && (
              <div className='flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400'>
                <AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
                <p className='text-sm'>{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor='language'
                className='block text-sm font-medium text-white/70 mb-2'
              >
                Programming Language
              </label>
              <div className='relative'>
                <select
                  id='language'
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className='w-full bg-black/20 text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all'
                >
                  <option value=''>All Languages</option>
                  {programming_languages.map((lang) => (
                    <option
                      style={{ backgroundColor: 'black', color: 'white' }}
                      key={lang}
                      value={lang}
                    >
                      {lang}
                    </option>
                  ))}
                </select>
                <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-white/40'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
              <p className='mt-2 text-sm text-white/50'>
                Select a language to filter repositories
              </p>
            </div>

            <div>
              <label
                htmlFor='feedType'
                className='block text-sm font-medium text-white/70 mb-2'
              >
                Feed Type
              </label>
              <div className='relative'>
                <select
                  id='feedType'
                  value={selectedFeedType}
                  onChange={(e) => setSelectedFeedType(e.target.value as FeedType)}
                  className='w-full bg-black/20 text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all'
                >
                  <option value=''>Feed Type</option>
                  <option value='new'>New</option>
                  <option value='random'>Random</option>
                </select>
                <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-white/40'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
              <p className='mt-2 text-sm text-white/50'>
                Random feed will show a random repository each time. New feed
                will show the most recently created repositories.
              </p>
            </div>

            <div>
              <label
                htmlFor='token'
                className='block text-sm font-medium text-white/70 mb-2'
              >
                GitHub Token
              </label>
              <input
                id='token'
                type='password'
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder='ghp_xxxxxxxxxxxx'
                className='w-full bg-black/20 text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all'
              />
              <p className='mt-2 text-sm text-white/50'>
                Add a GitHub token to avoid rate limiting. You can{' '}
                <a
                  href='https://github.com/settings/tokens/new?description=gitkot&scopes=public_repo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 hover:text-blue-300 transition-colors'
                >
                  create one on GitHub.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-black/20'>
          <button
            onClick={onClose}
            className='px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-5 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-xl transition-colors'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}