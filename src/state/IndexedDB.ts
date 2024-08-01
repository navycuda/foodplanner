import { idbStores, dbVersion, InitialState, InitialStateKeys } from "./InitialState";

let Db:           IDBDatabase;
let Name:         string;
let Version:      number;
let Request:      IDBOpenDBRequest;

interface enumerator{
  [name:string]: string;
}

export const initDb = (name:string,version:number,stores:enumerator):Promise<void> => {
  return new Promise((resolve) => {
    Name = name;
    Version = version;
    Request = indexedDB.open(Name,Version);

    Request.onupgradeneeded = () => {
      Db = Request.result;
      for (const store of Object.values(stores)){
        if (!Db.objectStoreNames.contains(store)){
          console.log(`Creating ${store} for ${Name}`);
          const keyPath = InitialStateKeys[store]?.keyPath || "_id";
          const autoIncrement = InitialStateKeys[store]?.autoIncrement || true;
          if (InitialState[store]) {
            const options = InitialStateKeys[store] ? { keyPath, autoIncrement } : {};
            const objectStore = Db.createObjectStore(store,options);
            for ( const [ name, value ] of Object.entries(InitialState[store])){
              console.log(`objectStore.add(${name}) = `,value);
              objectStore.add(value,name);
            }
          } else {
            const objectStore = Db.createObjectStore(store, { keyPath, autoIncrement });
          }
        }
      }
    }
    Request.onsuccess = () => {
      Db = Request.result;
      Version = Db.version;
      resolve();
    }
    Request.onblocked = () => {
      throw new Error('Initialization of the database is blocked');
    }
    Request.onerror = () => {
      throw new Error('Unable to initialize the database');
    }
  });
}


export const addData = <T>(storeName: string, data: T): Promise<IDBValidKey|null> => {
  return new Promise((resolve) => {
    const transaction = Db.transaction(storeName, 'readwrite');
    const request = transaction.objectStore(storeName).add(data);
    
    request.onsuccess       = () => {}
    request.onerror         = () => { throw new Error('Unable to addData'); }
    
    transaction.oncomplete  = () => resolve(request.result);
    transaction.onerror     = () => { throw new Error('Unable to complete addData transaction'); }
  });
}

export const putData = <T>(storeName: string, value: T, key?:IDBValidKey): Promise<IDBValidKey|null> => {
  return new Promise((resolve) => {
    const transaction = Db.transaction(storeName, 'readwrite');
    const request = transaction.objectStore(storeName).put(value,key);

    request.onsuccess       = () => {
      transaction.oncomplete  = () => resolve(request.result);
    }
    
    request.onerror         = () => { throw new Error('Unable to putData'); }
    transaction.onerror     = () => { throw new Error('Unable to complete putData transaction'); }
  });
}


export const getItem = <T>(storeName: string, key:IDBValidKey): Promise<T> => {
  return new Promise((resolve) => {
    const transaction = Db.transaction(storeName, 'readonly');
    const request = transaction.objectStore(storeName).get(key);
    
    request.onsuccess       = () => {}
    request.onerror         = () => { throw new Error('Unable to getItem'); }
    
    transaction.oncomplete  = () => resolve(request.result);
    transaction.onerror     = () => { throw new Error('Unable to complete getItem transaction'); }
  });
}

export const getStore = <T>(storeName: string):Promise<T> => {
  return new Promise((resolve) => {
    const transaction = Db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const getKeysRequest = objectStore.getAllKeys();
    const getValuesRequest = objectStore.getAll();

    getKeysRequest.onsuccess          = () => {
      const keys = getKeysRequest.result;
      getValuesRequest.onsuccess        = () => {
        const values = getValuesRequest.result;
        transaction.oncomplete  = () => {
          const resultObject:{[key:string]:unknown} = {};
  
          for (let k = 0; k < keys.length; k++){
            resultObject[keys[k]] = values[k];
          }
  
          resolve(resultObject);
        };
      };
    };
    
    getKeysRequest.onerror            = () => { throw new Error('Unable to getItem.keys'); }
    getValuesRequest.onerror          = () => { throw new Error('Unable to getItem.values'); }


    transaction.onerror     = () => { throw new Error('Unable to complete getItem transaction'); }
  });
}


export const initializeIndexedDB = ():Promise<void> => {
  return new Promise((resolve) => {
    navigator
    .storage
    .persist()
    .then(result => {
      if (!result) throw new Error("Persistant storage denied");
      initDb("FoodPlanner",dbVersion,idbStores)
        .then(() => {
          resolve();
        });
    })
    .catch(error => {
      console.error(error);
    });
  });
}