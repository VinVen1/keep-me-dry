import { Language } from '@kmd/shared/interfaces/languages.type';

export interface Geolocation {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
}

export type LocalNames = {
  [language in Language]: string;
} & {
  ascii: string;
  feature_name: string;
};
