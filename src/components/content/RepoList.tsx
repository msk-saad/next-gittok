

import { RefObject } from "react";
import RepoCard, { Repository } from "./RepoCard";

interface RepoListProps {
  repositories: Repository[];
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}


export default function (props: RepoListProps) {
  const {repositories, scrollContainerRef} = props;
  return (
    <div
    ref={scrollContainerRef}
    className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide"
    >
      {repositories.map((repository) => (
        <div
        key={repository.id}
        className="snap-start min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex items-center py-6"
        >
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 h-full">
            <RepoCard repository={repository}/>
          </div>
        </div>
      ))}
    </div>
  );
}