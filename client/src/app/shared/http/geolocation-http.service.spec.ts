import { TestBed } from '@angular/core/testing';

import { GeolocationHttpService } from './geolocation-http.service';

describe('GeolocationHttpService', () => {
  let service: GeolocationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
