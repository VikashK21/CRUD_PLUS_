const express = require('express');
const route = express.Router();
const joi = require('joi');

//bringing the connected database...
const knex = require('../db.config/db.config')

//accessing the code of jwt...
const { createToken, accessToken } = require('./security')
route.use(express.json())

route.get('/login', async (req, res) => {
    const data = await req.body;
    try {
        const result = await knex('user')
        .where({ email: `${data.email}`, password: `${data.password}` });

        if (result.length>0) {
            const token = await createToken(data)
            res.cookie("cookie", token).send('You are Logged In now.');
        }
        else{
            res.send('This account does not exist, go for SignUp!!')
        }

    } catch (err) {
        res.send(err)
        console.log(err)
    }

})

const validation = (res, data) => {

    const vSchema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().min(10).max(50).required(),
        password: joi.string().min(8).max(16).required()
    })
    const schemaValidate = vSchema.validate(data);
    if (schemaValidate.error){
        return res.status(500).json({
            message: schemaValidate.error.message
        })
    }
    else{
        return schemaValidate.value;
    }
}

route.post('/signup', async (req, res) => {
    const validatedData = await validation(res, req.body)
    try {
        const result = await knex('user')
        .where({ email: `${validatedData.email}` , password: `${validatedData.password}`});

        if (result.length>0) {
            res.send('This account already exist!!');
        }
        else{
            await knex('user').insert(validatedData)
            res.cookie("cookie", 0).send('You are Signed Up now.')
        }

    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

route.get("/data", accessToken, async (req, res) => {
    try {
        const all = await knex("user");
        res.send(all)

    } catch (err) {
        res.send(err);
        console.log(err);
    }
})

route.put('/update/:id', async(req, res) => {
    const validatedData = await validation(res, req.body)
    try {
        const result = await knex('user') 
        .where({ email: `${validatedData.email}`, password: `${validatedData.password}` });
        if (result.length>0) {
            res.send('This account already exist!!')
        }
        else{
            const result2 = await knex('user').where({id: req.params.id}).update(validatedData)
            console.log(result2);
            if (result2==1){
                res.send('Your account is updated.')
            }
            else{
                res.send('This id does not exist!!')
            }
        }
    } catch (err) {
        res.send(err)
        console.log(err)
        
    }
})

route.delete('/delete/:id', async(req, res) => {
    try {
        const result = await knex('user').where({id: req.params.id}).del();
        console.log(result);
        res.send('This account is no more now.')
  
    } catch (err) {
        res.send(err);
        console.log(err);
    }
})

module.exports = route;