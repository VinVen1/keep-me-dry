import {MeasurementType, UnitMeasure} from '@kmd/shared/interfaces/unit-measure.type';

export const MEASURE_UNITS: Record<UnitMeasure, Record<MeasurementType, string>> = {
  metric: {
    speed: 'm/s',
    temp: '°C',
    pressure: 'hPa'
  },
  imperial: {
    speed: 'mps',
    temp: '°F',
    pressure: 'hPa'
  }
}
