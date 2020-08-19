// https://www.npmjs.com/package/react-indexed-db

export const DBConfig = {
  name: 'TermBeeDB',
  version: 2,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } }
      ]
    },
    {
        store: 'devices',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'ip', keypath: 'ip', options: { unique: false } }
        ]
      }
  ]
};