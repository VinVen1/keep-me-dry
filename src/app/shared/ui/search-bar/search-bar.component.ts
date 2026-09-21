import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
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
  localitiesList = input<Geolocation[]>([]);
  currentLang: Language = 'it';

  searchControl = new FormControl<string>('');
  showResults = signal<boolean>(false);

  onLocalitySearch = output<string>();
  onLocalitySelect = output<Geolocation>();
  onLangSwitch = output<Language>();

  ngOnInit() {
    this.listenSearchChanges();
  }

  private listenSearchChanges() {
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300), takeUntilDestroyed(this._destroyRef))
      .subscribe((value: string | null) => {
        this.onLocalitySearch.emit(value ?? '');
        this.showResults.set(true);
      });
  }

  selectLocality(locality: Geolocation) {
    this.onLocalitySelect.emit(locality);
    this.searchControl.setValue(
      locality.local_names ? locality.local_names[this.currentLang] : locality.name,
    );
    this.showResults.set(false);
  }

  clearSearch() {
    this.searchControl.reset('');
    this.showResults.set(false);
    this.onLocalitySearch.emit('');
  }
}
