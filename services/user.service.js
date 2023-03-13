const faker = require("faker");
class UserService{
  constructor(){
    this.users = [];
    this.generate();
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
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl()
      });
    }
  }

  find(){
    return this.users;
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
