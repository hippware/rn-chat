// @flow

import {observable, computed, action} from 'mobx';
import {serializable, primitive} from 'serializr';

export default class Address {
  @observable
  @serializable(primitive())
  city: string = '';

  @observable
  @serializable(primitive())
  country: string = '';

  @observable
  @serializable(primitive())
  county: string = '';

  @observable
  @serializable(primitive())
  neighborhood: string = '';

  @observable
  @serializable(primitive())
  route: string = '';

  @observable
  @serializable(primitive())
  state: string = '';

  @observable
  @serializable(primitive())
  street: string = '';

  @observable
  @serializable(primitive())
  county: string = '';

  @observable
  @serializable(primitive())
  address: string = '';

  @observable loading: boolean = false;

  @computed
  get locationShort(): string {
    const {city, state, country, county, address} = this;
    if (country) {
      return country === 'US' || country === 'United States' ? `${city || county}, ${state}` : city || county || state ? `${city || county || state}, ${country}` : country;
    } else {
      if (address) {
        const arr = address.split(', ');
        const parsedCity = arr.length > 2 ? `${arr[arr.length - 3].replace(/\d+/g, '').trim()}, ` : '';
        const parsedState = arr.length > 1 ? arr[arr.length - 2].replace(/\d+/g, '').trim() : '';
        const parsedCountry = arr[arr.length - 1];
        if (parsedCountry === 'USA') {
          return parsedCity + parsedState;
        } else {
          if (parsedState && parsedState !== '-') {
            return `${parsedState}, ${parsedCountry}`;
          }
          return parsedCountry;
        }
      }
      return '';
    }
  }

  @computed
  get loaded(): boolean {
    return this.country !== '';
  }

  constructor(data) {
    this.load(data);
  }

  @action
  clear() {
    this.city = '';
    this.state = '';
    this.country = '';
    this.address = '';
  }

  @action
  load(data: ?Object) {
    if (!data || !Object.keys(data).length) return;
    Object.keys(data).forEach(key => (this[key] = data[key]));
  }
}
