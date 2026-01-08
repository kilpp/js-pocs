const fs = require('fs');

class Database {
  constructor(filepath) {
    this.filepath = filepath;
    try {
      fs.statSync(this.filepath);
    } catch (err) {
      fs.writeFileSync(this.filepath, JSON.stringify({ users: [] }));
    }
  }

  load() {
    const data = fs.readFileSync(this.filepath);
    return JSON.parse(data);
  }

  save(data) {
    fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2));
  }

  insert(record) {
    const db = this._load();
    const collection = db.users;
    record.id = collection.length + 1;
    collection.push(record);
    this.save(db);
    return record;
  }

  list() {
    const db = this._load();
    return db.users;
  }

  get(id) {
    const db = this._load();
    return db.users.find(record => record.id === id);
  }

  update(id, newProps) {
    const db = this._load();
    const record = db.users.find(record => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found.`);
    }
    Object.assign(record, newProps);
    this._save(db);
    return record;
  }

  delete(id) {
    const db = this._load();
    const index = db.users.findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error(`Record with id ${id} not found.`);
    }
    db.users.splice(index, 1);
    this.save(db);
  }
}

module.exports = Database;
