// @flow

import {reaction, observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import geocodingStore from '../store/geocodingStore';
import * as log from '../utils/log';
import Location from '../model/Location';

export default class AddressHelper {
  @observable text: string = '';
  @observable suggestions: IObservableArray<Object> = [];
  @observable location: Location;
  handlers: Function[] = [];
  nextQuery: ?string = null;
  querying: boolean = false;

  constructor(location) {
    // log.log("CREATE ADDRESS", JSON.stringify(location));
    this.handlers.push(reaction(() => ({text: this.text, loc: this.location}), this.setSuggestionsFromText, true));

    this.location = location;
    this.setTextFromLocation(location);
    this.handlers.push(reaction(() => this.location, this.setTextFromLocation));
  }

  setSuggestionsFromText = ({text, loc}) => {
    if (!text) {
      // console.log('& clear?');
      this.suggestions.clear();
    } else {
      log.log('& GQUERY :', text, JSON.stringify(loc));
      this.query(text, loc);
    }
  };

  setTextFromLocation = (location: Object) => {
    log.log('handler2', location);
    if (location) {
      geocodingStore.reverse(location).then((data) => {
        if (data.length) {
          this.text = data[0].place_name;
        }
      });
    }
  };

  query = async (text, location) => {
    if (this.querying) {
      this.nextQuery = text;
      return;
    }
    this.querying = true;
    try {
      const data = await geocodingStore.query(text, location);
      this.suggestions.replace(data);
    } finally {
      this.querying = false;
      if (this.nextQuery) this.query(this.nextQuery);
      this.nextQuery = null;
    }
  };

  clear() {
    this.handlers.forEach(h => h());
    this.handlers = [];
  }
}
