import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const pathWithoutInitialSlash = req.url.startsWith('/') ? req.url.slice(1) : req.url;

  const apiReq = req.clone({
    url: `${environment.apiUrl}/${pathWithoutInitialSlash}`
  });
  return next(apiReq);
};
