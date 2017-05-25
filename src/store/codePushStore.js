import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
const codePush = process.env.NODE_ENV === 'test' ? null : require('react-native-code-push');

@autobind class CodePushStore {
    @observable metadata = null;
    @observable syncing = false;
    @observable syncStatus = [];

    @action async start() {
        if (codePush) {
            this.metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
        }
    }

    @action async sync(choice: Object) {
        try {
            const syncOptions = {
                updateDialog: {
                    appendReleaseDescription: true,
                },
                installMode: codePush.InstallMode.IMMEDIATE,
                deploymentKey: choice.key,
            };
            this.syncing = true;
            this.syncStatus = [];
            const status = await codePush.sync(syncOptions);
            const {
                AWAITING_USER_ACTION,
                CHECKING_FOR_UPDATE,
                DOWNLOADING_PACKAGE,
                INSTALLING_UPDATE,
                SYNC_IN_PROGRESS,
                UP_TO_DATE,
                UPDATE_INSTALLED,
                UPDATE_IGNORED,
                UNKNOWN_ERROR,
            } = codePush.SyncStatus;
            switch (status) {
                case AWAITING_USER_ACTION:
                    this.addStatus('Awaiting user action');
                    break;
                case SYNC_IN_PROGRESS:
                    this.addStatus('Sync in progress.');
                    break;
                case CHECKING_FOR_UPDATE:
                    this.addStatus('Checking for updates.');
                    break;
                case DOWNLOADING_PACKAGE:
                    this.addStatus('Downloading package.');
                    break;
                case INSTALLING_UPDATE:
                    this.addStatus('Installing update.');
                    break;
                case UP_TO_DATE:
                    this.addStatus('Up-to-date.');
                    this.syncing = false;
                    break;
                case UPDATE_INSTALLED:
                    this.addStatus('Update installed.');
                    this.syncing = false;
                    break;
                case UPDATE_IGNORED:
                    this.addStatus('Update ignored.');
                    this.syncing = false;
                    break;
                case UNKNOWN_ERROR:
                    this.syncing = false;
                    this.addStatus('unknown sync error');
                    break;
                default:
                    this.addStatus(`unhandled status: ${status}`);
            }
        } catch (err) {
            alert(`Codepush error: ${JSON.stringify(err)}`);
        }
    }

    @action addStatus(status: string) {
        this.syncStatus.push(status);
    }
}

export default new CodePushStore();
