import Image from 'next/image';
import { Settings, RefreshCw } from 'lucide-react';
import githubIcon from '../../../public/github.svg';
interface NavBarProps {
  onSettingsClick: () => void;
  onRefreshClick: () => void;
  isDataLoading: boolean;
}

export default function NavBar(props: NavBarProps) {
  const { onSettingsClick, onRefreshClick, isDataLoading } = props;

  return (
    <nav className="flex flex-row justify-around lg:w-full h-18 border-b-1 border-b-white/[0.03]/20">
      {/* <nav className="flex flex-row justify-around lg:w-full h-18 border-b-1 border-b-white/[0.03]/20"> */}
      {/* flex flex-row justify-around items-center lg:w-full w-11/12 mx-auto h-18 border rounded-xl border-white/[0.03] absolute top-0 left-1/2 transform -translate-x-1/2 px-4 py-2 */}
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