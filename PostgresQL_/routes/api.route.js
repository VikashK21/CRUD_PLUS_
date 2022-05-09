const router = require('express').Router();
const knex = require('../config/db.config')

router.get('/users', async (req, res, next) => {
  // res.send({ message: 'Ok api is working 🚀' });
  try {
    const result = await knex('login_signup')
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.send(err.message);
    
  }
});

router.post('/signup', async(req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').insert(data);
    console.log(result);
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.send(err.message);
    
  }

})

router.post('/login', async(req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where(data);
    res.json(result);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);
    
  }
})

router.patch('/update_acc/:id', async(req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where({id: req.params.id}).update(data)
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.send(err.message);    
  }
})

router.put('/change_acc/:id', async(req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where({id: req.params.id}).update(data);
    res.json(result);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);
    
  }
});

router.delete('/delete_user/:id', async(req, res) => {
  try {
    const result = await knex('login_singnup').where({id: req.params.id}).del()
    res.json(result);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);
    
  }
})

module.exports = router;
