const faker = require("faker");
const boom = require("@hapi/boom");

//Connection to postgres
const getConnection = require("../libs/postgres");
const pool = require("../libs/postgres.pool");
const sequelize = require ("../libs/sequelize");

class UserService{


  constructor(){
    this.users = [];
    this.generate();

    //It is necessary in second connection only because sequelize implements pooling byt itself
    // this.pool = pool;
    // this.pool.on("error",(err)=> console.log(err));
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.name.jobArea()
      });
    }
  }

  async find(){
    //return this.users;

    //First Connection
    // const client = await getConnection();
    // const response = await client.query('SELECT * FROM test');
    // return response.rows;

    //Second Connection
    // const query = "SELECT * FROM test";
    // const response = await this.pool.query(query);
    // return response.rows;

    //Third Connection
    const query = "SELECT * FROM test";
    const [data, metadata] =  await sequelize.query(query);
    return data;
  }

  async find2(){
    const query = "SELECT * FROM test2";
    const [data, metadata] = await sequelize.query(query);
    return data;
  }

  async update2(password){
    const query = `UPDATE test2 SET name='${password}' WHERE id = 1;`;
    const [data, metadata] = await sequelize.query(query);
    return data;
  }

  findOne(id){
    //const name = this.getTotal();
    //The following find() is a built-in function of JavaScript
    return this.users.find(item => item.id === id);
  }

  update(id,changes){
    const index =  this.users.findIndex(item => item.id === id);
    if(index===-1){
      throw new Error("user not found");
    }
    const user = this.users[index];
    this.users[index]={
      ...user,
      ...changes
    };
    return this.users[index];
  }

  delete(id){
    const index =  this.users.findIndex(item => item.id === id);
    if(index===-1){
      throw new Error("user not found");
    }
    this.users.splice(index,1);
    return {id: id};
  }
}

module.exports = UserService;
