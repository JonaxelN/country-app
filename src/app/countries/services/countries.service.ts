import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface ';
import { Region } from '../interfaces/region.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  };


  constructor(private http: HttpClient) {
    this.loadToLocalStoreage();
  }

  private saveToLocalStoreage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }
  private loadToLocalStoreage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of ([])),
        // delay(2000)
      );
  }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(_ => this.saveToLocalStoreage())
      );
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: term, countries}),
        tap(_ => this.saveToLocalStoreage())
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {term, countries}),
        tap(_ => this.saveToLocalStoreage())
      );
  }



}
