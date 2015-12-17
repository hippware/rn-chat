import SQLite from 'react-native-sqlite-storage';
function errorCB(err) {
    console.log("SQL Error: " + err);
}

function successCB() {
    console.log("SQL executed fine");
}

function openCB() {
    console.log("Database OPENED");
}


class SqlStore {
    constructor(){
        this.db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB);
        this.db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS STORAGE (ID TEXT PRIMARY KEY NOT NULL, VALUE TEXT NOT NULL)', [], (tx, results) => {
                console.log("Query completed");
            });
        });

    }
    setItem(key, value, callback){
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('INSERT OR REPLACE INTO STORAGE VALUES (?, ?)', [key, value], (tx, results) => {
                    console.log("Insert completed");
                    callback && callback(null, true);
                    resolve(true);
                });
            });
        });
    }
    getItem(key, callback){
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('SELECT VALUE FROM STORAGE WHERE ID = ?', [key], (tx, results) => {
                    if (results.rows.length == 0){
                        console.log("GET completed: empty for key:"+key);
                        callback && callback(null, null);
                        resolve(null);
                    } else {
                        let value = results.rows.item(0).VALUE;
                        console.log("GET completed: "+value+ " for key:"+key);
                        callback && callback(null, value);
                        resolve(value);
                    }
                });
            });
        });
    }
    removeItem(key, callback){
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('DELETE FROM STORAGE WHERE ID = ?', [key], (tx, results) => {
                });
            });
        });
    }
    getAllKeys(callback){
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql('SELECT ID FROM STORAGE', [], (tx, results) => {
                    let res = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        res.push(results.rows.item(i).ID);
                    }
                    callback && callback(null, res);
                    resolve(res);
                });
            });
        });
    }
}

export default new SqlStore();