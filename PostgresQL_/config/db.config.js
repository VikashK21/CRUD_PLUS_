const knex = require('knex')({
    client: 'pg',
    connection: 'postgres://ng:abc@localhost:5432/crud',
})

knex.schema.createTable('login_signup', table => {
    table.increments('id');
    table.string('name');
    table.string('email').unique()
    table.string('password');
})
    .then(() => {
        console.log('Database conneted successfully.')
    })
    .catch(err => {
        console.error(err.message)
    })

module.exports = knex;