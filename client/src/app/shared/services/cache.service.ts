import { Injectable } from '@angular/core';

const CACHE_TTL = 30;
const CACHE_TTL_MS = CACHE_TTL * 60 * 1000;

interface CacheData {
  /**
   * Cached data
   */
  data: unknown;
  /**
   * Last save timestamp
   */
  ts: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  /**
   * Checks if the data associated with the given key is cached and valid.
   *
   * @param {string} key The unique identifier used to check the cache.
   * @return {boolean} Returns true if the data is cached and valid, otherwise false.
   */
  isCached(key: string): boolean {
    const cache = this.getCache(key);
    return cache ? this.isValid(cache.ts) : false;
  }

  /**
   * Retrieves the data associated with the specified key from the cache.
   *
   * @param {string} key - The key used to look up data in the cache.
   * @return {unknown | undefined} The data associated with the key, or undefined if no data exists for the given key.
   */
  getData(key: string): unknown | undefined {
    return this.getCache(key)?.data;
  }

  /**
   * Stores the provided data in sessionStorage associated with the given key.
   * The data is stored along with a timestamp of when it was set.
   *
   * @param {string} key - The key under which the data will be stored in sessionStorage.
   * @param {*} data - The data to be stored in sessionStorage.
   * @return {void} This method does not return a value.
   */
  setData(key: string, data: unknown): void {
    const currentTimestamp = new Date().getTime();
    const cache: CacheData = {
      ts: currentTimestamp,
      data: data,
    };

    try {
      sessionStorage.setItem(key, JSON.stringify(cache));
    } catch {
      console.warn(
        '[CacheService - setData()] Storage quota exceeded or save failed. Key removed.',
      );
      this.removeData(key);
    }
  }

  removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  private getCache(key: string): CacheData | undefined {
    try {
      const cache = sessionStorage.getItem(key);
      return cache ? JSON.parse(cache) : undefined;
    } catch {
      console.warn('[CacheService - getCache()] Failed to retrieve or parse cache');
      this.removeData(key);
      return undefined;
    }
  }

  private isValid(timestamp: number): boolean {
    const expiration = timestamp + CACHE_TTL_MS;
    const currentTimestamp = new Date().getTime();

    return expiration > currentTimestamp;
  }
}
