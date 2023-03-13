const faker = require("faker");
const boom = require("@hapi/boom");

//Connection to postgres
const getConnection = require("../libs/postgres");
const pool = require("../libs/postgres.pool");

class UserService{


  constructor(){
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on("error",(err)=> console.log(err));
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
    const query = "SELECT * FROM test";
    const response = await this.pool.query(query);
    return response.rows;
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
