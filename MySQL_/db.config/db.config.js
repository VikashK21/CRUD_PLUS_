require('dotenv').config()
const knex=require('knex')({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})
//connecting to the db...

//creating table
knex.schema.createTable('user', (table) =>{
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('password');
})
.then(() => {
    console.log('Table created.');
})
.catch(()=>{
    console.log('Table already exist!!')
})

module.exports=knex;