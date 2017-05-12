import autobind from 'autobind-decorator';
import File from '../model/File';

@autobind class FileFactory {
    files: {string: File} = {};

    create = (id: string, data, lazy = false): File => {
        // console.log('CREATE FILE', id);
        if (!id) {
            return new File();
        }
        if (!this.files[id]) {
            this.files[id] = new File(id, lazy);
        } else {
            // console.log('FILE ALREADY EXISTS', id, JSON.stringify(this.files[id]));
        }
        // assign additional data
        if (data) {
            if (data.item) {
                this.files[id].item = data.item;
            }
            if (data.isNew) {
                this.files[id].isNew = data.isNew;
            }
            // Object.assign(this.files[id], data);
        }
        return this.files[id];
    };
}

export default new FileFactory();
