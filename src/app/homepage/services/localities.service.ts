import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { GeolocationHttpService } from '@kmd/shared/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { Geolocation } from '@kmd/shared/interfaces';
import { CacheService, LoadingService } from '@kmd/shared/services';
import { DEFAULT_LAT, DEFAULT_LON } from '@kmd/shared/utils';

const LOCALITY_CACHE_KEY = 'locality';

@Injectable({
  providedIn: 'root',
})
export class LocalitiesService {
  private readonly _geolocationHttp = inject(GeolocationHttpService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _cache = inject(CacheService);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();
  private readonly _localities = signal<Geolocation[]>([]);
  localities = this._localities.asReadonly();
  private readonly _currentLocality = signal<Geolocation>({
    name: 'Roma',
    lat: DEFAULT_LAT,
    lon: DEFAULT_LON,
  });
  currentLocality = this._currentLocality.asReadonly();

  constructor() {
    const cachedLocality = this._cache.getData(LOCALITY_CACHE_KEY) as Geolocation;
    if (cachedLocality) this._currentLocality.set(cachedLocality);
  }

  getLocalities(address: string) {
    this._isLoading.set(true);

    if (address.length <= 0) {
      this._localities.set([]);
      return;
    }

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
      finalize(() => this._loadingService.hide()),
      switchMap(({ lat, lon }) => {
        this._loadingService.show();
        return this.getLocalityFromCoords(lat, lon).pipe(
          map((res) => res[0]),
          tap((locality) => this.setCurrentLocality(locality)),
          finalize(() => this._loadingService.hide()),
        );
      }),
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

  setCurrentLocality(locality: Geolocation) {
    this._cache.setData(LOCALITY_CACHE_KEY, locality);
    this._currentLocality.set(locality);
  }
}
