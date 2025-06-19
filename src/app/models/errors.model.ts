export interface NetflixError {
  code: NetflixErrorCodes;
  message: string;
}

export enum NetflixErrorCodes {
  PLAN_DATA_NOT_FOUND,
  PLAYLIST_LIMIT_REACHED,
}

export const isNetflixErrorWithCode = (error: any, code: NetflixErrorCodes): error is NetflixError => {
  return isNetflixError(error) && error.code === code;
}

export const isNetflixError = (error: any): error is NetflixError => {
  return error && typeof error === 'object' && 'code' in error && 'message' in error
    && typeof error.message === 'string';
}
