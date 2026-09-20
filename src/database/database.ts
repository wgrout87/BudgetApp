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

export type Account = {
  id: number;
  name: string;
  type: string;
  balance: number;
};

export async function addAccount(name: string, type: string, balance: number) {
  const db = await SQLite.openDatabaseAsync("budget.db");

  await db.runAsync(
    "INSERT INTO accounts (name, type, balance) VALUES (?, ?, ?)",
    name,
    type,
    balance,
  );
}

export async function getAccounts(): Promise<Account[]> {
  const db = await SQLite.openDatabaseAsync("budget.db");

  return await db.getAllAsync<Account>(
    "SELECT * FROM accounts ORDER BY id DESC",
  );
}
