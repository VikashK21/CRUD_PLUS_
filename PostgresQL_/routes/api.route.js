const router = require('express').Router();
const knex = require('../config/db.config');
const { authentication, authorization } = require('../auth/security');

router.get('/users', authentication, async (req, res, next) => {
  // res.send({ message: 'Ok api is working 🚀' });
  try {
    const result = await knex('login_signup')
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.send(err.message);

  }
});

router.post('/signup', authentication, async (req, res) => {
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

router.post('/login', async (req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where(data);
    if(result.length>0) {
      const token = authorization(result);
      res.cookie('key', token).json(result);
    }
    else {
      res.send('This user does not exists!!')
    }

  } catch (err) {
    console.error(err.message);
    res.send(err.message);

  }
})

router.patch('/update_acc/:id', authentication, async (req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where({ id: req.params.id }).update(data)
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  }
})

router.put('/change_acc/:id', authentication, async (req, res) => {
  const data = req.body;
  try {
    const result = await knex('login_signup').where({ id: req.params.id }).update(data);
    res.json(result);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);

  }
});

router.delete('/delete_user/:id',authentication, async (req, res) => {
  try {
    const result = await knex('login_singnup').where({ id: req.params.id }).del()
    res.json(result);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);

  }
})

router.post('/logout', authentication, async(req, res) => {
  try {
    res.clearCookie().send('You are logged out successfully.');
  } catch (err) {
    res.send(err.message);
    console.error(err.message);
    
  }
})

module.exports = router;
