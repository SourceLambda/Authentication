const bcrypt = require("bcrypt");

async function hashPassword(){
  const password = "124kajsdf";
  const hash = await bcrypt.hash(password,10);
  //This is the value I have to save in the database
  console.log(hash);
  console.log("working!");
}

hashPassword();
