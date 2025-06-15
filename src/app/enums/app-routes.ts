export enum AppRoutes {
  HOME = '/',
  MOVIE_DETAILS = '/movie/:id',
  PLAYLISTS = '/playlists',
  PLAYLIST_DETAILS = '/playlists/:id',
  LOGIN = '/login',
  SIGNUP = '/signup'
}

// Helper functions for parameterized routes
export class RouteParams {
  static movieDetails(id: string | number): (string | number)[] {
    return ['/movie', id.toString()];
  }

  static playlistDetails(id: string | number): (string | number)[] {
    return ['/playlists', id.toString()];
  }
}
