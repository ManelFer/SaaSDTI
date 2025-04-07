import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

// Initialize database
export async function initializeDatabase() {
  const db = await open({
    filename: './dbOs.db',
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS service_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      os_number TEXT UNIQUE NOT NULL,
      opening_date TIMESTAMP NOT NULL,
      heritage TEXT,
      applicant TEXT NOT NULL,
      sector TEXT NOT NULL,
      reported_problem TEXT NOT NULL,
      service_start TIMESTAMP,
      found_problem TEXT,
      technician_action TEXT,
      service_end TIMESTAMP,
      situation TEXT CHECK (situation IN ('solved', 'pending')),
      technician_id INTEGER NOT NULL,
      FOREIGN KEY (technician_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      model TEXT,
      heritage TEXT,
      lot TEXT,
      is_listed BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dump_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      model TEXT,
      heritage TEXT,
      lot TEXT,
      problem TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create default admin user if not exists
  const adminExists = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
      ['admin', hashedPassword, 'admin']
    );
  }

  return db;
}

// Export database instance
export const db = initializeDatabase(); 