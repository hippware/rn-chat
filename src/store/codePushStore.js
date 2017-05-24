import NativeEnv from 'react-native-native-env';
import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
import codePush from 'react-native-code-push';

@autobind class CodePushStore {
    version = NativeEnv.get('VERSION_NAME');
    @observable metadata = null;
    @observable syncing = false;
    @observable syncStatus = [];

    @action async start() {
        this.metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
    }

    @action async sync(choice: Object) {
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
        const {CHECKING_FOR_UPDATE, DOWNLOADING_PACKAGE, INSTALLING_UPDATE, UP_TO_DATE, UPDATE_INSTALLED, UNKNOWN_ERROR} = codePush.SyncStatus;
        switch (status) {
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
                break;
            case UNKNOWN_ERROR:
                this.syncing = false;
                this.addStatus('unknown sync error');
                break;
            default:
                this.addStatus(`unhandled status: ${status}`);
        }
    }

    @action addStatus(status: string) {
        this.syncStatus.push(status);
    }
}

export default new CodePushStore();
