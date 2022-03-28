const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * @param {string} password
 * hashing password
 */
async function hashingPassword(password) {
  return await bcrypt.hash(password, saltRounds).then((hash) => hash);
}

/**
 * @param {string} password
 * @param {string} hash
 * Compare password with hash
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash).then((valid) => valid);
}

module.exports = { hashingPassword, comparePassword };
