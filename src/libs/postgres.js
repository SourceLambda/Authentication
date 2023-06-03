//This connection isn't the best becuase every client has to create a new connection to connect
//with the db. Therefore, pooling is the better one becuase it uses only one connection for each one
const { Client } = require("pg");

async function getConnection(){
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "admin",
    database: "mydb"
  });
  await client.connect(); //Await appears becuase it returns a promise so I have to use an await
  return client;
}

module.exports = getConnection;
