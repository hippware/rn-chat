import model from '../src/model/model';
import searchStore from '../src/store/searchStore';
import {expect} from 'chai';
import {when, spy} from 'mobx';
import Profile from '../src/model/Profile';

describe('profile', function () {
  step('invalid profile handle', async function (done) {
    const profile = new Profile('test');
    profile.handle = 'aksonov';
    profile.email = 'a@gmail.com';
    try {
      const res = await profile.validate('handle');
    } catch (e) {
      expect(e).to.be.equal('Username not available');
      expect(profile.isValid).to.be.false;
      done();
    }
  });
  step('invalid profile handle2 ', async function (done) {
    const profile = new Profile('test');
    profile.handle = 'aksonov213891293192083';
    try {
      const res = await profile.validate('handle');
    } catch (e) {
      expect(profile.isValid).to.be.false;
      done();
    }
  });
  step('invalid profile2 ', async function (done) {
    try {
      const profile = new Profile('test');
      profile.firstName = 'aksonov213891293192083';
      try {
        const res = await profile.validate('firstName');
        console.log('RES:', res);
      } catch (e) {
        expect(e).to.be.equal('First Name can only contain alphabet characters');
        expect(profile.isValid).to.be.false;
        done();
      }
    } catch (e) {
      console.error(e);
    }
  });
  step('valid profile ', async function (done) {
    const profile = new Profile('test');
    profile.firstName = 'Pavlo';
    profile.lastName = 'V';
    profile.email = 'a@gmail.com';
    profile.handle = 'aksonov123123';
    const res = await profile.validate('firstName');
    expect(profile.isValid).to.be.true;
    done();
  });
});
