const { Client } = require("pg");
require("dotenv").config();
const { argv } = require("node:process");

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (300) NOT NULL,
    membership_status BOOLEAN NOT NULL DEFAULT FALSE
);`;

const messagesTable = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    text VARCHAR (500) NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const usersMessagesTable = `
CREATE TABLE IF NOT EXISTS users_messages (
    user_id INTEGER,
    message_id INTEGER
);`;

async function main() {
  try {
    console.log("seeding...");

    const client = new Client({
      connectionString: process.env.DATABASE_LOCAL_URL,
    });

    try {
      await client.connect();
      console.log("Connected to the database.");
    } catch (err) {
      console.error("Failed to connect:", err);
      return;
    }

    try {
      await client.query(usersTable);
      await client.query(messagesTable);
      await client.query(usersMessagesTable);
      console.log("Database seeded successfully.");
    } catch (err) {
      console.error("Failed to execute query:", err);
    } finally {
      await client.end();
      console.log("Connection closed.");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

main();
