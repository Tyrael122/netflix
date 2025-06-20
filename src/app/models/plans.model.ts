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

export enum Plans {
  Free = 'Free',
  Pro = 'Pro',
  Premium = 'Premium'
}

export const PLANS: Plan[] = [
  {
    id: Plans.Free,
    name: 'Free',
    price: 0,
    features: {
      playlistCreation: {
        limit: 2
      },
      reviews: {
        canView: true,
        canWrite: false,
        canReply: false
      },
      search: {
        type: 'basic',
        hasFilters: false,
        hasSorting: false
      },
      canSeeSimilarMovies: false,
      canWatchTrailers: false
    }
  },
  {
    id: Plans.Pro,
    name: 'Pro',
    price: 10,
    features: {
      playlistCreation: {
        limit: 10
      },
      reviews: {
        canView: true,
        canWrite: true,
        canReply: false
      },
      search: {
        type: 'basic',
        hasFilters: false,
        hasSorting: false
      },
      canSeeSimilarMovies: true,
      canWatchTrailers: true
    }
  },
  {
    id: Plans.Premium,
    name: 'Premium',
    price: 15,
    features: {
      playlistCreation: {
        limit: Infinity
      },
      reviews: {
        canView: true,
        canWrite: true,
        canReply: true
      },
      search: {
        type: 'advanced',
        hasFilters: true,
        hasSorting: true
      },
      canSeeSimilarMovies: true,
      canWatchTrailers: true
    }
  }
];
