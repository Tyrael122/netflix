import {HttpInterceptorFn} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {inject} from '@angular/core';
import {ToastService} from '../services/toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((httpError) => {
      const apiError = httpError.error as ApiError;

      // Determine the message to show (prioritize friendly message)
      const errorMessage = apiError?.friendlyMessage || 'An unexpected error occurred. Please, try again later.';
      toastService.showError(errorMessage);

      if (apiError?.validationErrors) {
        console.warn('Validation errors:', apiError.validationErrors);
      }

      return throwError(() => ({
        ...httpError,
        apiError
      }));
    })
  );
};

interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  technicalMessage: string;
  friendlyMessage: string;
  validationErrors: { [key: string]: string };
}
