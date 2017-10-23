import {observable, computed, action, toJS} from 'mobx';
import {serializable, primitive} from 'serializr';

export default class BotAddress {
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

  @observable loading: boolean = false;

  @computed
  get locationShort(): string {
    const {city, state, country, county} = this;
    return country === 'US' ? `${city || county}, ${state}` : `${city || county}, ${country}`;
  }

  @computed
  get loaded(): boolean {
    return this.country !== '';
  }

  constructor(data) {
    this.load(data);
  }

  @action
  load(data) {
    if (!data || !Object.keys(data).length) return;
    Object.keys(data).forEach(key => (this[key] = data[key]));
  }
}
