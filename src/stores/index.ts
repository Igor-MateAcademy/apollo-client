import { createContext, useContext } from 'react';
import { configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });

import MapStore from './map';

class RootStore {
  @observable mapStore = MapStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

export default new RootStore();
