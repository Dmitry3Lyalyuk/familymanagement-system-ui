import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

export const loaderInterseptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.startLoading();

  return next(req).pipe(finalize(() => loaderService.stopLoading()));
};
