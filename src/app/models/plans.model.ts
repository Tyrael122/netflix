export interface Plan {
  id: string;
  name: string;
  price: number;
  features: PlanFeatures;
}

export interface PlanFeatures {
  playlistCreation: {
    limit: number;
  };
  reviews: {
    canView: boolean;
    canWrite: boolean;
    canReply: boolean;
  };
  search: {
    type: 'basic' | 'advanced';
    hasFilters: boolean;
    hasSorting: boolean;
  };
  canSeeSimilarMovies: boolean;
  canWatchTrailers: boolean;
}
