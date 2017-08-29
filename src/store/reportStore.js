// @flow

import base64 from 'base-64';
import {observable} from 'mobx';
import Profile from '../model/Profile';
import profileStore from '../store/profileStore';
import botFactory from '../factory/botFactory';
import model from '../model/model';

class ReportStore {
  @observable text: string;

  reportUser = async (reporteeId: string) => {
    const reportee: Profile = profileStore.create(reporteeId);
    const subject = `Report User: @${reportee.handle}`;
    const message = `Reporting User: @${model.profile.handle}, ID: ${model.user}
      Reported User: @${reportee.handle}, ID: ${reportee.user}\r\n
      ${this.text}`;
    return this.submitTicket(subject, message);
  };

  reportBot = async (botId: string) => {
    const bot = botFactory.create({id: botId});
    const subject = `Report Bot: ${bot.title}`;
    const message = `Reporting User: @${model.profile.handle}, ID: ${model.user}
      Reported Bot: ${bot.title}, ID: ${bot.id}\r\n
      ${this.text}`;
    return this.submitTicket(subject, message);
  };

  submitTicket = async (subject: string, message: string): Promise<boolean> => {
    const user = 'eric@hippware.com';
    const auth = base64.encode(`${user}/token:gdOuE64spNPMESygzT9dGuFg7zhIE4ug0SD53pm3`);
    const body = {
      ticket: {
        subject,
        comment: {
          body: message,
        },
      },
    };
    try {
      const response = await fetch('https://hippware.zendesk.com/api/v2/tickets.json?async=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(body), // stringify-safe?
      });
      let parsed;
      if (response.headers.get('Content-Type') && response.headers.get('Content-Type').indexOf('application/json') !== -1) {
        parsed = await response.json();
      } else {
        parsed = await response.text();
      }
      if (parsed && parsed.ticket && parsed.ticket.id) {
        console.log('Zendesk ticket submitted!', parsed, response);
        return true;
      } else {
        console.warn('Zendesk ticket failed', parsed, response);
        return false;
      }
    } catch (err) {
      console.warn('Zendesk ticket error', err);
      return false;
    }
  };
}

export default new ReportStore();
