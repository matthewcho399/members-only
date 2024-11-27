const pool = require("./pool");

async function createUser() {
  await pool.query(`SELECT * FROM users;`);
}

module.exports = {
  createUser,
};
