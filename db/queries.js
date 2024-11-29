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

async function getUser(username) {
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

module.exports = {
  createUser,
  getUser,
};
