/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 100).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100).notNullable();
    table.string("phone", 100).nullable();
    table.text("address").nullable();
    table.string("city", 100).nullable();
    table.string("state", 100).nullable();
    table.string("zip", 100).nullable();
    table.string("country", 100).nullable();
    table.string("avatar", 100).nullable();
    table.enum("role", ["admin", "user"]).defaultTo("user").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
