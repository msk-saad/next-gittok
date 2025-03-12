import '../styles/nav.css'
import Image from 'next/image';
import settingsIcon from '../../public/settings.svg';
import refreshIcon from '../../public/refresh.svg';
import githubIcon from '../../public/github.svg';

export default function Nav() {
  return (
    <>
      <nav className="flex flex-row justify-around bg-zinc-800 w-full h-14 nav-bar">
        <div className='flex'>
          <Image src={githubIcon} alt='github-icon' width={28} height={28} />
          <h1 className="text-2xl font-bold lg:p-3 md:p-3 hero-title">gittok</h1>
        </div>

        <div className='flex '>
          <a href='#' target='_blank' className='p-3'>
            <Image src={settingsIcon} alt="settings-icon" width={22} height={22} />
          </a>
          <a href='#' target='_blank' className='p-3'>
            <Image src={refreshIcon} alt='refresh-icon' width={22} height={22} />
          </a>
        </div>
      </nav>
    </>
  );
}