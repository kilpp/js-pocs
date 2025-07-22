const SimpleCache = require('./SimpleCache');

// Create a new cache instance.
const cache = new SimpleCache();

console.log("\n--- Basic SET and GET ---");
cache.set("mykey", "Hello");
cache.get("mykey"); // Should print "Hello"
cache.get("nonexistent"); // Should print null

console.log("\n--- Key Deletion (DEL) ---");
cache.del("mykey");
cache.get("mykey"); // Should now be null

console.log("\n--- Checking Key Existence (HAS) ---");
cache.set("persistent_key", "I am here to stay");
cache.has("persistent_key"); // Should be true
cache.has("gone_key"); // Should be false

console.log("\n--- Incrementing (INCR) ---");
cache.set("counter", 5);
cache.incr("counter"); // Should be 6
cache.incr("new_counter"); // Should be 1

console.log("\n--- TTL and Expiration ---");
cache.set("short_lived", "I will disappear soon", 2); // 2-second TTL

console.log("Checking 'short_lived' immediately after setting...");
cache.get("short_lived"); // Should print the value

// Wait for 3 seconds to let the key expire.
setTimeout(() => {
  console.log("\nChecking 'short_lived' after 3 seconds...");
  cache.get("short_lived"); // Should print null because it has expired.
  console.log("\n--- Example Finished ---");
}, 3000);