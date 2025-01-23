import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMesage = 'An unexprected error occured.';

    if (error.error?.message) {
      errorMesage = error.error.message;
    }
    if (error.error?.error) {
      const errorDetails = Object.values(error.error.eroror).flat().join(', ');
      errorMesage = `Validation errors: ${errorDetails}`;
    }

    return errorMesage;
  }
}
