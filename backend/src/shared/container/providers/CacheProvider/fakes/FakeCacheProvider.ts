import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = value;
  }
  public async recover<T>(key: string): Promise<T | null> {
    const storagedData = this.cache[key];
    if (!storagedData) {
      return null;
    }
    const parsedData = JSON.parse(storagedData) as T;

    return parsedData;
  }
  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }
  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
