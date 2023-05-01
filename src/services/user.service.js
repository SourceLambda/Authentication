const faker = require("faker");
const boom = require("@hapi/boom");

//Connections to postgres
const getConnection = require("../libs/postgres");
const pool = require("../libs/postgres.pool");
const sequelize = require ("../libs/sequelize");
const bcrypt = require("bcrypt");

//To use the models
// Sequilize creates a namespace called models every time I send it setupModels, User.init, where it saves all of the models
// The name of the model is the name of the class into db/models/user.model.js file
// models referes to EVERY model, not only the model that's placed in user.model.js
const { models } = require("./../libs/sequelize");

class UserService{

  constructor(){

  }

  async create(user){

    var role = 'customer';
    if (user.role){
      role = user.role;
    }
    const hash = await bcrypt.hash(user.password,10);
    const query = `INSERT INTO users (email, password,role) VALUES ('${user.email}','${hash}','${role}');`;
    const data = await sequelize.query(query);
    return {message: 'Creation was completed correctly!'};

  }

  async findByEmail(email){
    const query = `SELECT * FROM users WHERE email = '${email}';`;
    const [data,metadata] = await sequelize.query(query);
    return data[0];
  }

  async find(){

    const query = "SELECT * FROM users";
    const [data, metadata] =  await sequelize.query(query);
    return data;
  }


  async update(email,oldPassword){
    const newPassword = await bcrypt.hash(oldPassword,10);
    const query = `UPDATE users SET password = '${newPassword}' WHERE email = '${email}';`;
    const data = await sequelize.query(query);
    return {message: 'Updating was completed correctly!'};
  }

}

module.exports = UserService;
