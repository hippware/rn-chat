import roster from './roster'
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
import './XmppStropheV2'

export default roster
export type IXmppService = typeof roster.Type
