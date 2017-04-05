import SelectableProfile from './SelectableProfile';
import Profile from './Profile';
import {action, autorun, reaction, computed, observable} from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class SelectableProfileList {
    original: [Profile] = [];
    @observable list: [SelectableProfile] = [];
    @observable filter: string = '';
    multiSelect: boolean = true;

    @computed get selected() {
        return this.list.filter(el => el.selected).map(el => el.profile)
    }

    @computed get allSelected() {
        return this.list.filter(el => el.selected).length === this.list.length
    }

    constructor(list: [Profile], multiSelect: boolean = true) {
        if (list) {
            this.replace(list);
            this.original = list;
        }
        this.multiSelect = multiSelect;

        reaction(() => this.filter, text => {
            console.log("SEARCH WITH TEXT", text);
            this.replace(this.original.filter(el => {
                return !el.isOwn && (!text
                    || (el.firstName && el.firstName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
                    || (el.lastName && el.lastName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
                    || (el.handle && el.handle.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())))

            }));
        });
    }

    @action replace = (list: [Profile]) => {
        this.list.replace(list.map(el => new SelectableProfile(el, false)));
    };

    @action clear = () => {
        this.list.splice(0);
    };

    @action deselectAll = () => {
        this.list.forEach(el => {
            el.selected = false;
        });
    };

    @action selectAll = () => {
        this.list.forEach(el => {
            el.selected = true;
        });
    };

    @action switch = (row: SelectableProfile) => {
        if (!this.multiSelect) {
            this.deselectAll();
        }
        row.selected = !row.selected;

    }

}