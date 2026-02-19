import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { GeolocationHttpService } from '@kmd/shared/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, switchMap } from 'rxjs';
import { Geolocation } from '@kmd/shared/interfaces';
import { LoadingService } from '@kmd/shared/services';

@Injectable({
  providedIn: 'root',
})
export class LocalitiesService {
  private readonly _geolocationHttp = inject(GeolocationHttpService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();
  private readonly _localities = signal<Geolocation[]>([]);
  localities = this._localities.asReadonly();

  getLocalities(address: string) {
    this._isLoading.set(true);

    this._geolocationHttp
      .getLocalities(address)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe({
        next: (localities: Geolocation[]) => {
          this._localities.set(localities);
        },
      });
  }

  getLocalityFromCoords(lat: number, lon: number) {
    return this._geolocationHttp
      .getLocalityFromCoords(lat, lon)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  getLocalityFromCurrentPosition() {
    this._loadingService.show();
    return this.getCurrentCoords().pipe(
      switchMap(({ lat, lon }) =>
        this.getLocalityFromCoords(lat, lon).pipe(finalize(() => this._loadingService.hide())),
      ),
    );
  }

  private getCurrentCoords() {
    return new Observable<{ lat: number; lon: number }>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          observer.next({ lat, lon });
          observer.complete();
        },
        (err) => {
          observer.error(err);
        },
      );
    });
  }
}
