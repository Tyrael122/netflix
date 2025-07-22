export interface Review {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string; // Optional, can be undefined if not provided
  }
  rating: number;
  content: string;
  likes: number;
  createdAt: string;
}

export interface ReviewDraft {
  readonly rating: number;
  readonly content: string;
}
