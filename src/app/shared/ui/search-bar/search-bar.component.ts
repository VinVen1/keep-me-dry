import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { Geolocation, Language } from '@kmd/shared/interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kmd-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  currentLocality = input<string>();
  localitiesList = input<Geolocation[]>();
  currentLang = 'it';

  searchControl = new FormControl<string>('');

  onLocalitySearch = output<string>();
  onLocalitySelect = output<{ lat: number; lon: number }>();
  onLangSwitch = output<Language>();

  ngOnInit() {
    this.listenSearchChanges();
  }

  private listenSearchChanges() {
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300), takeUntilDestroyed(this._destroyRef))
      .subscribe((value: string | null) => this.onLocalitySearch.emit(value ?? ''));
  }

  selectLocality(locality: Geolocation) {
    this.onLocalitySelect.emit({ lat: locality.lat, lon: locality.lon });
    this.searchControl.setValue(locality.name as string);
  }
}
