import autobind from 'autobind-decorator';
import File from '../model/File';

@autobind
class FileFactory {
  files: {string: File} = {};
  
  create = (id: string) => {
    console.log("CREATE FILE", id);
    if (!id){
      return new File(id);
    }
    if (!this.files[id]){
      this.files[id] = new File(id);
    } else {
      console.log("FILE ALREADY EXISTS", id);
    }
    return this.files[id];
  };
  
  
}

export default new FileFactory()