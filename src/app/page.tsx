'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/nav/NavBar';
import RepoList from '../components/content/RepoList';
import { OfflineState } from '../components/OfflineState';
import { LoadingPopup } from '../components/LoadingPopup';
import Settings from '../components/nav/Settings';
import { useGitHub } from '../hooks/use-github';
import { useInfiniteScroll } from '../hooks/use-infinite-scroll';
import { FeedType } from '../lib/github';
import ErrorState from '../components/Error';
import { useOnlineStatus } from '../hooks/use-online-status'; 

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedToken, setSelectedToken] = useState<string>();
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>('random');
  const [isInitialized, setIsInitialized] = useState(false);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language');
    const savedToken = localStorage.getItem('github_token');
    const savedFeedType = localStorage.getItem('feed_type') as FeedType;

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    if (savedToken) {
      setSelectedToken(savedToken);
    }

    if (savedFeedType) {
      setSelectedFeedType(savedFeedType);
    }

    setIsInitialized(true);
  }, []);

  const {
    repositories,
    isLoading,
    isFetchingMore,
    fetchMore,
    error,
    refresh,
    isRefetching,
  } = useGitHub({
    language: selectedLanguage,
    token: selectedToken,
    enabled: isInitialized,
    feedType: selectedFeedType,
  });

  const scrollContainerRef = useInfiniteScroll({
    onLoadMore: fetchMore,
    isLoading: isLoading || isFetchingMore,
  });

  const handleSaveSettings = (language: string, token: string, feedType: FeedType) => {
    setSelectedLanguage(language);
    setSelectedToken(token);
    setSelectedFeedType(feedType);
    localStorage.setItem('preferred_language', language);
    localStorage.setItem('github_token', token);
    localStorage.setItem('feed_type', feedType);
  };

  const getErrorMessage = (error: unknown) => {
    if (!error) return undefined;
    return error instanceof Error ? error.message : String(error);
  };

  console.log('Repositories:', repositories);  // Debugging line

  return (
    <div className='h-screen relative flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {(isFetchingMore || isLoading || isRefetching) && <div>Loading...</div>} {/* Optional loading indication */}

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onSave={handleSaveSettings}
          initialLanguage={selectedLanguage}
          initialToken={selectedToken}
          initialFeedType={selectedFeedType}
          error={getErrorMessage(error)}
          onRefresh={refresh}
        />
      )}

      <NavBar
        onSettingsClick={() => setShowSettings(true)}
        onRefreshClick={refresh}
        isDataLoading={isFetchingMore || isLoading || isRefetching}
      />

      {!isOnline ? (
        <OfflineState />
      ) : isLoading ? (
        <LoadingPopup />
      ) : error ? (
        <ErrorState error={error.toString()} />
      ) : (
        <RepoList
          repositories={repositories}
          scrollContainerRef={scrollContainerRef}
        />
      )}
    </div>
  );
}
