import autobind from 'autobind-decorator';
import File from '../model/File';

@autobind
class FileFactory {
  files: {string: File} = {};
  
  create = (id: string) => {
    if (!id){
      return new File(id);
    }
    if (!this.files[id]){
      this.files[id] = new File(id);
    }
    return this.files[id];
  };
  
  
}

export default new FileFactory()