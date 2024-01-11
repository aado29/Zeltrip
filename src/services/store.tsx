/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/interfaces/user';
import SyncStorage, { KeyType } from '../config/sync-storage';

const prefix = '1643644207702';

export default {
  set: (name: string, item: any): Promise<void> => {
    return SyncStorage.set(prefix + name, item);
  },

  get: (name: string): any => {
    return SyncStorage.get(prefix + name);
  },

  setUserToken: (accessToken: string | null): Promise<void> => {
    return SyncStorage.set(`${prefix}accessToken`, accessToken);
  },

  setUser: (user: User | null): Promise<void> => {
    return SyncStorage.set(`${prefix}user`, user);
  },

  getUserToken: (): string => {
    return SyncStorage.get(`${prefix}accessToken`);
  },

  getUser: (): User => {
    return SyncStorage.get(`${prefix}user`);
  },

  getAllKeys: (): string[] => {
    return SyncStorage.getAllKeys();
  },

  remove: (key: string): Promise<void> => {
    return SyncStorage.remove(prefix + key);
  },

  reset(except: KeyType[] = []) {
    SyncStorage.getAllKeys().forEach((key: KeyType) => {
      if (except.findIndex((i: KeyType) => prefix + i === key) === -1) {
        SyncStorage.remove(key);
      }
    });
  },
};
