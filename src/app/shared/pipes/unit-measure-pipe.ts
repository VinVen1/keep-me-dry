import {inject, Pipe, PipeTransform} from '@angular/core';
import {MeasurementType} from '@kmd/shared/interfaces/unit-measure.type';
import {UnitMeasureService} from '@kmd/shared/services/unit-measure.service';
import {MEASURE_UNITS} from '@kmd/shared/utils/unit-conversion';

@Pipe({
  name: 'unit',
})

export class UnitMeasurePipe implements PipeTransform {
  private _selectedUnit = inject(UnitMeasureService).selectedUnit();

  transform(value: string | number, measurementType: MeasurementType): string {
    const unitMeasure = MEASURE_UNITS[this._selectedUnit][measurementType];

    return `${value} ${unitMeasure}`;
  }

}
