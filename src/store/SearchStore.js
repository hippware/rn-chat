import algoliasearch from 'algoliasearch/reactnative';
const client = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
const index = client.initIndex('dev_wocky_users');

export default class SearchStore {
  search(text){
    return new Promise((resolve, reject) => {
      index.search(text, function searchDone(err, content) {
        if (err){
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
}

