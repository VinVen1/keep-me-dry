import { inject, Pipe, PipeTransform } from '@angular/core';
import { MeasurementType } from '@kmd/shared/interfaces/unit-measure.type';
import { UnitMeasureService } from '@kmd/shared/services/unit-measure.service';
import { MEASURE_UNITS } from '@kmd/shared/utils/unit-conversion';

/**
 * UnitMeasurePipe is a custom Angular pipe that formats a given value by appending the appropriate
 * unit of measurement based on the selected unit and measurement type.
 *
 * This pipe is useful for applications that need to display values along with their corresponding
 * measurement units dynamically based on user preferences or application settings.
 *
 * The units of measurement used are determined by the `UnitMeasureService` injected into the pipe.
 *
 * Transform Method:
 * - Appends a unit of measurement to the provided value based on the measurement type.
 * - If the value is undefined, it returns a default placeholder ('-').
 *
 * Parameters:
 * - value: The numeric or string value to be transformed, representing the measurement quantity.
 * - measurementType: The type of measurement (e.g., weight, length, temperature) to determine the correct unit.
 *
 * Returns:
 * - A string that combines the input value with its corresponding measurement unit.
 */
@Pipe({
  name: 'unit',
})
export class UnitMeasurePipe implements PipeTransform {
  private _selectedUnit = inject(UnitMeasureService).selectedUnit();

  transform(
    value: number | undefined | null,
    measurementType: MeasurementType,
    fractionDigits: number = 0,
  ): string {
    const unitMeasure = MEASURE_UNITS[this._selectedUnit][measurementType];
    if (value) {
      return `${value.toFixed(fractionDigits)} ${unitMeasure}`;
    }

    return `0 ${unitMeasure}`;
  }
}
