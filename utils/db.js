import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Reprepets a DB 
 */
class DBClient {
  /**
   * Create new DB.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if connection to DB is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrvs ref
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrvs ref
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrvs ref
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrvs ref
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;