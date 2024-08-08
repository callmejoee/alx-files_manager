import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis connection error:', err.message || err.toString());
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, expiration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, expiration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
