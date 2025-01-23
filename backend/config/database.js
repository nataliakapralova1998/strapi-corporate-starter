const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi_database'),
      user: env('DATABASE_USERNAME', 'nataliakapralova'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: false, // Make sure SSL is disabled if not using it
    },
  },
});