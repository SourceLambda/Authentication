// Also to connect to postgres. Its specializtion is related to ORM but also works with raw queries
//Sequelize works better with JavaScript￼
//There's another library that works better with Typescript is called TypeORM.
const {Sequelize} = require("sequelize");

const { config } = require("./../config/config");

const setupModels  = require("./../db/models/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
  dialect: "postgres",
  logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports =  sequelize;
