require('dotenv').config()
const express=require('express');
//all the querries are comming from ...

const router=require('./backend/server')

const app=express();
const port=process.env.port || 4000;

app.use('/', router)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is the front page viewing.')
})


// 

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})


