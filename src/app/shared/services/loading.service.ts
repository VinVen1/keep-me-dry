import {computed, Injectable, signal} from '@angular/core';

const DEFAULT_MSG = "Caricamento in corso..."

@Injectable({
  providedIn: 'root',
})

export class LoadingService {

  private readonly _message = signal<string>(DEFAULT_MSG);
  message = this._message.asReadonly();

  private readonly _requestCount = signal<number>(0)
  isLoading = computed<boolean>(() => !!this._requestCount());


  /**
   * Show the loader component
   * @param msg - Optional, show a message on the loader
   */
  show(msg?: string) {
    if (msg) this._message.set(msg);
    this._requestCount.update(count => count + 1);
  }

  /**
   * If there aren't any other pending requests, hide the loader component
   */
  hide() {
    this._requestCount.update(count => Math.max(0, count - 1));
    if (this._requestCount() === 0)
      this._message.set(DEFAULT_MSG);
  }

}
