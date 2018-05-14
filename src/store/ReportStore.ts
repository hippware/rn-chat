import base64 from 'base-64'
import {observable} from 'mobx'
import {IProfile, IBot} from 'wocky-client'

class ReportStore {
  @observable text: string = ''
  @observable submitting: boolean = false

  reportUser = async (reportee: IProfile, ownProfile: IProfile) => {
    const subject = `Report User: @${reportee.handle}`
    const message = `Reporting User: @${ownProfile.handle}, ID: ${ownProfile.id}
      Reported User: @${reportee.handle}, ID: ${reportee.id}\r\n
      ${this.text}`
    return this.submitTicket(subject, message)
  }

  reportBot = async (bot: IBot, ownProfile: IProfile) => {
    const subject = `Report Bot: ${bot.title}`
    const message = `Reporting User: @${ownProfile.handle}, ID: ${ownProfile.id}
      Reported Bot: ${bot.title}, ID: ${bot.id}\r\n
      ${this.text}`
    return this.submitTicket(subject, message)
  }

  submitTicket = async (subject: string, message: string): Promise<boolean> => {
    const user = 'eric@hippware.com'
    const auth = base64.encode(`${user}/token:gdOuE64spNPMESygzT9dGuFg7zhIE4ug0SD53pm3`)
    const body = {
      ticket: {
        subject,
        comment: {
          body: message
        }
      }
    }
    this.submitting = true
    try {
      const response = await fetch('https://hippware.zendesk.com/api/v2/tickets.json?async=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`
        },
        body: JSON.stringify(body) // stringify-safe?
      })
      let parsed
      if (
        response.headers.get('Content-Type') &&
        response.headers.get('Content-Type')!.indexOf('application/json') !== -1
      ) {
        parsed = await response.json()
      } else {
        parsed = await response.text()
      }
      if (parsed && parsed.ticket && parsed.ticket.id) {
        // console.log('Zendesk ticket submitted!', parsed, response)
        return true
      } else {
        // console.warn('Zendesk ticket failed', parsed, response)
        return false
      }
    } catch (err) {
      // console.warn('Zendesk ticket error', err)
      return false
    } finally {
      this.submitting = false
    }
  }
}

export default new ReportStore()
