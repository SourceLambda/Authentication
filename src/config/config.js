//To read all the things that are in .env. It charges the env variables in the Node process, namely, the below clauses like process.env.NODE_ENV
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "env",
  port: process.env.PORT, // This is the port of the ms //So far those are features of the app only
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  ldapIp:process.env.LDAP_IP,
  ldapFirstPort:process.env.LDAP_FIRST_PORT,
  ldapSecondPort:process.env.LDAP_SECOND_PORT
}

module.exports = {config};
