import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'CampusConnect_G7.db';

const BUK_BUILDINGS = [
  "New Campus Library", 
  "CBN Hall", 
  "Faculty of Computing",
  "Rufa'i Garba Theater",
  "Old Campus Senate Building",
  "Musa Abdullahi Auditorium",
  "Faculty of Engineering",
  "Dangote Business School",
  "Student Affairs Division",
  "Aminu Kano Teaching Hospital Hub"
];

const BUK_USER_SURNAMES = ["Danbatta", "Gwarzo", "Dala", "Kofar-Ruwa", "Tarauni", "Nassarawa"];

export const getDBConnection = async () => {
  return await SQLite.openDatabaseAsync(DATABASE_NAME);
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      department TEXT,
      enrollmentYear INTEGER
    );
    CREATE TABLE IF NOT EXISTS Buildings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      latitude REAL,
      longitude REAL
    );
    CREATE TABLE IF NOT EXISTS Messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      senderId INTEGER,
      content TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const seedBUKDatabase = async (db: SQLite.SQLiteDatabase) => {
  const result = await db.getFirstAsync<{count: number}>('SELECT COUNT(*) as count FROM Buildings');
  if (result && result.count > 0) return; 

  console.log("Seeding Group 7 BUK Database via Expo SQLite...");

  for (let i = 0; i < BUK_BUILDINGS.length; i++) {
    const lat = 11.9815 + (Math.random() * 0.01);
    const lng = 8.4230 + (Math.random() * 0.01);
    await db.runAsync(
      `INSERT INTO Buildings (name, latitude, longitude) VALUES (?, ?, ?)`,
      [BUK_BUILDINGS[i], lat, lng]
    );
  }

  const departments = ["Software Engineering", "Cyber Security", "Business Admin", "Arts"];
  for (let i = 1; i <= 60; i++) {
    const randomSurname = BUK_USER_SURNAMES[Math.floor(Math.random() * BUK_USER_SURNAMES.length)];
    const randomDept = departments[Math.floor(Math.random() * departments.length)];
    const year = 2022 + Math.floor(Math.random() * 4); 
    
    await db.runAsync(
      `INSERT INTO Users (name, department, enrollmentYear) VALUES (?, ?, ?)`,
      [`Student ${randomSurname}`, randomDept, year]
    );
  }

  for (let i = 1; i <= 500; i++) {
    const senderId = Math.floor(Math.random() * 60) + 1;
    await db.runAsync(
      `INSERT INTO Messages (senderId, content) VALUES (?, ?)`,
      [senderId, `Initial seed message ${i} generated for Group 7.`]
    );
  }

  console.log("BUK Seed Complete.");
};