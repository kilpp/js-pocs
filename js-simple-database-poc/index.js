const Database = require('./database');
const db = new Database('db.json');

console.log('Simple DB Initialized!');

// Insert some users
console.log('Inserting users...');
db.insert({ name: 'Guilherme', email: 'guilherme@test.com' });
db.insert({ name: 'Joao', email: 'joao@test.com' });

// List all users
console.log('All users:', db.list());

// Get a specific user
console.log('User with id 1:', db.get(1));

// Update a user
console.log('Updating user with id 1...');
db.update(1, { name: 'Guilherme' });
console.log('Updated user:', db.get(1));

// Delete a user
console.log('Deleting user with id 2...');
db.delete(2);

// Final list of users
console.log('Final users list:', db.list());
