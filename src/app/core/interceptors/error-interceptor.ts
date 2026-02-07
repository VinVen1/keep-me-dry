import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * An HTTP interceptor function that catches and handles HTTP errors during
 * an outgoing HTTP request or response. It intercepts and processes HTTP
 * error responses, logs the error information to the console, and re-throws
 * the error for further handling.
 *
 * This interceptor modifies the stream of HTTP requests/responses by adding
 * error-handling capabilities. When an error occurs, it:
 * - Extracts an error message using the `getErrorMessage` utility function.
 * - Logs the HTTP status code, error message, and additional details to the browser console.
 * - Re-throws the error to allow further handling by downstream subscribers.
 *
 * @param req - The outgoing HTTP request to be handled.
 * @param next - The next handler in the HTTP request pipeline.
 * @returns An HTTP request stream modified to include error handling logic.
 */
export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = getErrorMessage(error);
      console.error(`[HTTP ${error.status}] ${message}`, error.message);
      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  const messages: Record<number, string> = {
    400: 'Richiesta non valida',
    401: 'Effettua il login.',
    403: 'Non sei autorizzato a vedere questa risorsa',
    404: 'Risorsa non trovata',
    500: 'Errore del server',
    503: 'Servizio non disponibile',
  };

  return messages[error.status] || error.error?.message || 'Errore sconosciuto';
}
