export interface Review {
  id: string;
  // In relational dabatase, this would be a foreign key reference to a User table.
  // Here, we use a simplified structure.
  // Nonetheless, the response structure would be similar to this, still having the author details.
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
  readonly originalReviewId?: string;
  readonly rating: number;
  readonly content: string;
}
