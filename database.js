import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const dataDirectory = path.resolve(process.env.DATABASE_DIR || './data');
fs.mkdirSync(dataDirectory, { recursive: true });
const databasePath = path.join(dataDirectory, 'secure-login.sqlite3');
const db = new Database(databasePath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
export const findUserByEmail = (email) => db.prepare('SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?').get(email);
export const findUserById = (id) => db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
export const createUser = ({ name, email, passwordHash }) => { const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(name, email, passwordHash); return findUserById(result.lastInsertRowid); };
export { db, databasePath };
