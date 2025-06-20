export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
  isSystemPlaylist: boolean;
  coverImageUrl?: string;
}

export enum SystemPlaylistIds {
  Favorites = 'favorites',
  WatchLater = 'watchlater',
  Watched = 'watched'
}

export const SYSTEM_PLAYLISTS: Playlist[] = [
  {
    id: SystemPlaylistIds.Favorites,
    name: 'Favorites',
    movieIds: [],
    isSystemPlaylist: true
  },
  {
    id: SystemPlaylistIds.WatchLater,
    name: 'Watch Later',
    movieIds: [],
    isSystemPlaylist: true
  },
  {
    id: SystemPlaylistIds.Watched,
    name: 'Watched',
    movieIds: [],
    isSystemPlaylist: true
  }
];
