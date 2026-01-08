
/**
 * A simple Redis-like in-memory cache with support for TTL (Time To Live).
 */
class SimpleCache {
  constructor() {
    this.cache = new Map();
    this.expirations = new Map();
    console.log("SimpleCache initialized.");
  }

  /**
   * Sets a key-value pair.
   * @param {string} key The key.
   * @param {*} value The value.
   * @param {number|null} ttlSeconds Time to live in seconds. If null, the key will not expire.
   */
  set(key, value, ttlSeconds = null) {
    this.cache.set(key, value);

    // If a TTL is provided, set the expiration timestamp.
    if (ttlSeconds && typeof ttlSeconds === 'number' && ttlSeconds > 0) {
      const expirationTime = Date.now() + ttlSeconds * 1000;
      this.expirations.set(key, expirationTime);
    } else {
      // Ensure no previous expiration is left over for this key.
      this.expirations.delete(key);
    }
    console.log(`SET: ${key} = ${value}` + (ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''));
  }

  /**
   * Retrieves a value by its key. Returns null if the key doesn't exist or is expired.
   * This method uses lazy expiration.
   * @param {string} key The key.
   * @returns {*} The value or null.
   */
  get(key) {
    // Check for expiration first.
    if (this.expirations.has(key)) {
      if (Date.now() > this.expirations.get(key)) {
        console.log(`EXPIRED: ${key}`);
        this.cache.delete(key);
        this.expirations.delete(key);
        return null; // Key has expired.
      }
    }

    const value = this.cache.get(key);
    const result = value !== undefined ? value : null;
    console.log(`GET: ${key} -> ${result}`);
    return result;
  }

  /**
   * Deletes a key from the cache.
   * @param {string} key The key to delete.
   * @returns {number} 1 if a key was deleted, 0 otherwise.
   */
  del(key) {
    const wasDeleted = this.cache.delete(key);
    this.expirations.delete(key);
    console.log(`DEL: ${key}`);
    return wasDeleted ? 1 : 0;
  }

  /**
   * Checks if a key exists and is not expired.
   * @param {string} key The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    // The get method handles the expiration logic, so we can just check its result.
    const exists = this.get(key) !== null;
    console.log(`HAS: ${key} -> ${exists}`);
    return exists;
  }

  /**
   * Increments the integer value of a key by one.
   * If the key does not exist, it is set to 0 before performing the operation.
   * Throws an error if the key contains a value of the wrong type.
   * @param {string} key The key.
   * @returns {number} The value of the key after the increment.
   */
  incr(key) {
    let value = this.get(key);

    if (value === null) {
      // If the key doesn't exist, start from 1.
      this.set(key, 1);
      return 1;
    }

    if (typeof value !== 'number') {
      throw new Error("ERR value is not an integer or out of range");
    }

    value++;
    this.set(key, value);
    console.log(`INCR: ${key} -> ${value}`);
    return value;
  }
}

module.exports = SimpleCache;
