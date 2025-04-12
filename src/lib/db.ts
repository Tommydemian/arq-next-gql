import Database from "better-sqlite3";

const db = new Database("./dev.db");

console.log("HEREEE");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT,
    tenantId TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    userId INTEGER,
    tenantId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`);

export { db };
