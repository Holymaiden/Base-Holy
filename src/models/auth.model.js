const conn = require("../../configs/database");
const { newDate } = require("../utils/date.util");

const getOneAuth = async (username) => {
  return conn("users")
    .where({
      username: username,
      deleted_at: null,
    })
    .select("username", "email", "role", "password")
    .first();
};

const registerAuth = async (data) => {
  return conn("users")
    .insert({
      username: data.username,
      password: data.password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      avatar: null,
      role: "user",
      created_at: newDate(),
      updated_at: newDate(),
      deleted_at: null,
    })
    .onConflict("email OR username")
    .merge();
};

module.exports = { getOneAuth, registerAuth };
