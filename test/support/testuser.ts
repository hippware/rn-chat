import XmppStropheV2 from '../../src/XmppStropheV2'
import {Wocky, IWocky} from '../../src'

export async function createXmpp(num: number): Promise<IWocky> {
  const provider = new XmppStropheV2()
  const phoneNumber = `000000${num.toString()}`
  const service = Wocky.create({resource: 'testing', host: 'testing.dev.tinyrobot.com'}, {provider, logger: {log: () => {}}})
  await service.testRegister({phoneNumber})
  await service.login()
  return service
}
