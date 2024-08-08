import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * A class that handles interactions with a Redis server.
 */
class RedisService {
  /**
   * Initializes a new RedisService instance.
   */
  constructor() {
    this.client = createClient();
    this.connectionStatus = true;
    this.client.on('error', (err) => {
      console.error('Redis connection error:', err.message || err.toString());
      this.connectionStatus = false;
    });
    this.client.on('connect', () => {
      this.connectionStatus = true;
    });
  }

  /**
   * Determines if the connection to the Redis server is active.
   * @returns {boolean} True if connected, otherwise false.
   */
  isConnected() {
    return this.connectionStatus;
  }

  /**
   * Fetches the value associated with a specific key.
   * @param {string} key The key for which the value needs to be retrieved.
   * @returns {Promise<string | null>} The value associated with the key, or null if the key does not exist.
   */
  async fetchValue(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Sets a value for a given key and specifies an expiration time.
   * @param {string} key The key under which the value will be stored.
   * @param {string | number | boolean} value The value to be stored.
   * @param {number} expiryTime The time in seconds after which the key-value pair should expire.
   * @returns {Promise<void>}
   */
  async storeValue(key, value, expiryTime) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, expiryTime, value);
  }

  /**
   * Deletes a specific key and its associated value.
   * @param {string} key The key to be removed.
   * @returns {Promise<void>}
   */
  async removeValue(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisService = new RedisService();
export default redisService;
