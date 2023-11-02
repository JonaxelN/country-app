import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];

  @Input()
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string) {
    console.log('Desde ByCapitalPage');
    console.log({ term });
    this.countriesService.searchCountry(term)
      .subscribe((countries) => {
        this.countries = countries
      });
  }
}
