// 'use client';

import '../../styles/nav.css'
import Image from 'next/image';
import { Settings, RefreshCw } from 'lucide-react';
import githubIcon from '../../../public/github.svg';
import '../../styles/nav.css'
interface NavBarProps {
  onSettingsClick: () => void;
  onRefreshClick: () => void;
  isDataLoading: boolean;
}

export default function NavBar(props: NavBarProps) {
  const { onSettingsClick, onRefreshClick, isDataLoading } = props;

  return (
    <nav className="flex flex-row justify-around ml-12 bg-zinc-800 w-full h-18 nav-bar border-b-1 lg:border-b-zinc-100/20 navbar">
      <div className='flex mt-3 ml-12'>
        <a href="#" className='flex items-center gap-2 text-white/70 hover:text-white transition-colors'>
          <Image className='mt-0' src={githubIcon} alt='github-icon' width={26} height={26} />
          <span className='text-xl font-medium'>GitTok</span>
        </a>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={onSettingsClick}
          className='p-2 text-white/70 hover:text-white transition-colors'
        >
          <Settings className='w-5 h-5' />
        </button>

        <button
          onClick={onRefreshClick}
          className='p-2 text-white/70 hover:text-white transition-colors'
          disabled={isDataLoading}
        >
          <RefreshCw className={`w-5 h-5 ${isDataLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </nav>
  );
}