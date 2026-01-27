import {Injectable, signal} from '@angular/core';
import {UnitMeasure} from '@kmd/shared/interfaces/unit-measure.type';

@Injectable({
  providedIn: 'root',
})
export class UnitMeasureService {
  private readonly _selectedUnit = signal<UnitMeasure>('metric');
  selectedUnit = this._selectedUnit.asReadonly();

  changeUnit(unit: UnitMeasure) {
    this._selectedUnit.set(unit);
  }

}
