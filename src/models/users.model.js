const conn = require("../../configs/database");
const { newDate } = require("../utils/date.util");

const getNumberUsers = async (search = null, id = null) => {
  let query = conn("users")
    .count("id as total")
    .where({ deleted_at: null })
    .first();

  if (search) {
    query = query.where("username", "like", `%${search}%`);
  }

  if (id) {
    query = query.where({ id: id });
  }

  return query;
};

const getAllUsers = async (
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null,
  id = null
) => {
  let query = conn("users")
    .select(
      "id",
      "username",
      "email",
      "first_name",
      "last_name",
      "phone",
      "address",
      "city",
      "state",
      "zip",
      "country",
      "avatar",
      "role",
      "created_at",
      "updated_at"
    )
    .where({ deleted_at: null });

  if (search) {
    query = query.where("username", "like", `%${search}%`);
  }

  if (id) {
    query = query.where({ id: id });
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
};

const createUser = async (data) => {
  return conn("users")
    .insert({
      username: data.username,
      password: data.password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      avatar: data.avatar,
      role: data.role,
      created_at: newDate(),
      updated_at: newDate(),
      deleted_at: null,
    })
    .onConflict("username OR email")
    .merge();
};

const updateUser = async (id, data) => {
  return conn("users")
    .update({
      username: data.username,
      password: data.password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      avatar: data.avatar,
      role: data.role,
      updated_at: newDate(),
    })
    .where({ id: id, deleted_at: null });
};

const deleteUser = async (id) => {
  return conn("users").update({ deleted_at: newDate() }).where({ id: id });
};

module.exports = {
  createUser,
  getAllUsers,
  getNumberUsers,
  updateUser,
  deleteUser,
};
