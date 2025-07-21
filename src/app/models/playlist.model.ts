export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
  systemPlaylistId?: string;
  coverImageUrl?: string;
}

export enum SystemPlaylistIds {
  Favorites = 'favorites',
  WatchLater = 'watch_later',
  Watched = 'watched'
}
