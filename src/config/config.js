//To read all the things that are in .env
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "env",
  port: process.env.PORT || 3000, //So far those are features of the app only
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}

module.exports = {config};
