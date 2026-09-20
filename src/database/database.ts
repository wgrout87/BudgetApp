import * as SQLite from "expo-sqlite";

export async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync("budget.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      balance REAL NOT NULL DEFAULT 0
    );
  `);

  return db;
}
