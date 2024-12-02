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
  console.log("granting membership");
  try {
    await pool.query(
      "UPDATE users SET membership_status = true WHERE id = $1;",
      [id]
    );
  } catch (e) {
    throw new Error("Couldn't grant membership");
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  grantMembership,
};
