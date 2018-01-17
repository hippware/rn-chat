import XmppStropheV2 from '../../src/XmppStropheV2'
import XmppService, {IXmppService} from '../../src/index'

export async function createXmpp(num: number): Promise<IXmppService> {
  const provider = new XmppStropheV2()
  const phoneNumber = `000000${num.toString()}`
  const service = XmppService.create({resource: 'testing', host: 'testing.dev.tinyrobot.com'}, {provider, logger: {log: () => {}}})
  await service.testRegister({phoneNumber})
  await service.login()
  return service
}
