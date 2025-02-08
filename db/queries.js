const { link } = require("../routes");
const pool = require("./pool");

async function createUser(firstName, lastName, username, password) {
  try {
    await pool.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4);",
      [firstName, lastName, username, password]
    );
  } catch (e) {
    throw new Error("Couldn't create user");
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    return rows[0];
  } catch (e) {
    throw new Error("Couldn't get user");
  }
}

async function getUserById(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [
      id,
    ]);
    return rows[0];
  } catch (e) {
    throw new Error("Couldn't get user");
  }
}

async function grantMembership(id) {
  try {
    await pool.query(
      "UPDATE users SET membership_status = true WHERE id = $1;",
      [id]
    );
  } catch (e) {
    throw new Error("Couldn't grant membership");
  }
}

async function getAllMessages() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        messages.id AS id,
        messages.title,
        messages.text,
        messages.added,
        users.username
      FROM 
        messages
      JOIN 
        users_messages ON messages.id = users_messages.message_id
      JOIN 
        users ON users_messages.user_id = users.id
      ORDER BY 
        messages.added DESC;
    `);
    return rows;
  } catch (e) {
    throw new Error("Couldn't get all messages");
  }
}

async function createMessage(title, text) {
  try {
    const message = await pool.query(
      "INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id;",
      [title, text]
    );
    return message.rows[0].id;
  } catch (e) {
    throw new Error("Couldn't create message");
  }
}

async function linkMessageToUser(user_id, message_id) {
  try {
    await pool.query(
      "INSERT INTO users_messages (user_id, message_id) VALUES ($1, $2);",
      [user_id, message_id]
    );
  } catch (e) {
    throw new Error("Couldn't link message to user");
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  grantMembership,
  getAllMessages,
  createMessage,
  linkMessageToUser,
};
