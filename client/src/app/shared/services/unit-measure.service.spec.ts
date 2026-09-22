import { TestBed } from '@angular/core/testing';

import { UnitMeasureService } from './unit-measure.service';

describe('UnitMeasureService', () => {
  let service: UnitMeasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitMeasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
