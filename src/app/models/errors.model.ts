export interface NetflixError {
  code: NetflixErrorCodes;
  message: string;
}

export enum NetflixErrorCodes {
  PLAN_DATA_NOT_FOUND,
  PLAYLIST_CREATION_LIMIT_REACHED,
  REVIEW_CREATION_NOT_ALLOWED,
  REVIEW_VIEW_NOT_ALLOWED,
}

export const createNetflixError = (code: NetflixErrorCodes, message: string): NetflixError => {
  console.warn(`Creating NetflixError with code: ${code}, message: "${message}"`);

  if (typeof code !== 'number' || !Object.values(NetflixErrorCodes).includes(code)) {
    throw new Error('Invalid NetflixError code');
  }

  if (message.trim() === '') {
    throw new Error('NetflixError message must be a non-empty string');
  }

  return {
    code,
    message
  };
}

export const isNetflixErrorWithCode = (error: any, code: NetflixErrorCodes): error is NetflixError => {
  return isNetflixError(error) && error.code === code;
}

export const isNetflixError = (error: any): error is NetflixError => {
  return error && typeof error === 'object' && 'code' in error && 'message' in error
    && typeof error.message === 'string';
}
