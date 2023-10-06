const mongoose = require('mongoose');
const colors=require('colors')


mongoose.connect(process.env.DATABASE_URI).then((conn) =>{
  console.log(`connection to the database is successfull,${conn.connection.host}`.bgBlue);
}).catch(err =>{
  console.log(err);
  Message.err ("there is an error while connecting with database");
})