const jwt = require('jsonwebtoken');

//authorization...
createToken= async(data) =>{
    const token = await jwt.sign({data}, 'security_key')
    console.log(token);
    return token;

}

//authentication...
accessToken = async(req, res, next) => {
    const cookie= await req.headers.cookie;
    console.log(req.headers);
    if (cookie){
        const token = cookie.split("=")[1];
        console.log(token);
        next()
    }
    else{
        console.log('something went wrong');
        res.send('Invalid person!!')
    }
}


module.exports = {createToken, accessToken};