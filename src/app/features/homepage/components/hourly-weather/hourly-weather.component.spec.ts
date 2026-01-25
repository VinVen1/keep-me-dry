import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWeatherComponent } from './hourly-weather.component';

describe('HourlyWeatherComponent', () => {
  let component: HourlyWeatherComponent;
  let fixture: ComponentFixture<HourlyWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyWeatherComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
