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

//MongoDB
const {MongoClient} = require("mongodb",{family:4});
const { config } = require("./../config/config");

class UserService{

  constructor(){

  }

  async create(user){

    var role = 'customer';
    if (user.role){
      role = user.role;
    }
    const hash = await bcrypt.hash(user.password,10);
    user.password = hash;

    //POSTGRES
    //const query = `INSERT INTO users (email, password,role) VALUES ('${user.email}','${hash}','${role}');`;
    //const data = await sequelize.query(query);

    //MONGODB
    const client = new MongoClient(config.dbMongoURI);
    try{
        await client.db("source_lambda").collection("user").insertOne(user);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }

    return {message: 'Creation was completed correctly!'};

  }

  async findByEmail(email){

    //POSTGRES
    // const query = `SELECT * FROM users WHERE email = '${email}';`;
    // const [data,metadata] = await sequelize.query(query);
    //MONGODB
    const client = new MongoClient(config.dbMongoURI);
    try{
        var data = await client.db("source_lambda").collection("user").findOne({"email":email});
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
    return data;
  }

  async find(){
    //POSTGRES
    // const query = "SELECT * FROM users";
    // const [data, metadata] =  await sequelize.query(query);
    //return data;
    //MONGODB
    const client = new MongoClient(config.dbMongoURI);
    try{
        var data = await client.db("source_lambda").collection("user").find().toArray();
        console.log(data);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
    return data;
  }


  async update(email,oldPassword){
    const newPassword = await bcrypt.hash(oldPassword,10);
    //POSTGRES
    // const query = `UPDATE users SET password = '${newPassword}' WHERE email = '${email}';`;
    // const data = await sequelize.query(query);

    //MONGODB
    const client = new MongoClient(config.dbMongoURI);

    var data = await client.db("source_lambda").collection("user").findOne({"email":email});
    if (data === null){
      return {error: "This user doesn't exist"};
    }

    try{
        await client.db("source_lambda").collection("user").updateOne({"email":email},{$set:{password:newPassword}});
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }

    return {message: 'Updating was completed correctly!'};
  }

}

module.exports = UserService;
