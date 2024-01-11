/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export type KeyType = string;
type Data = Map<KeyType, any>;

class SyncStorage {
  data: Data = new Map();

  async init(): Promise<Data> {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);

    data.forEach(this.saveItem.bind(this));

    return this.data;
  }

  get(key: KeyType): any {
    return this.data.get(key);
  }

  set(key: KeyType, value: any): Promise<void> {
    this.data.set(key, value);
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: KeyType): Promise<void> {
    this.data.delete(key);
    return AsyncStorage.removeItem(key);
  }

  saveItem(item: KeyValuePair): void {
    const [key] = item;
    let [, value] = item;

    try {
      value = JSON.parse(value || '');
    } catch (e) {
      console.error(e);
    }

    this.data.set(key, value);
  }

  getAllKeys(): Array<KeyType> {
    return Array.from(this.data.keys());
  }
}

const syncStorage = new SyncStorage();

export default syncStorage;
