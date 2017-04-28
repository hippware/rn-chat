import model from '../../model/model';
import autobind from 'autobind-decorator';

@autobind
export default class TestStorage {
    save(data) {
        return data;
    }

    load() {
        return {};
    }
}
