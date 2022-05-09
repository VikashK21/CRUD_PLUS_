const jwt = require('jsonwebtoken');

authorization = async (data) => {
    const token = await jwt.sign({id: data.id}, 'security_key');
    console.log(token);
    return token;
}

authentication = async (req, res, next) => {
    const cookie = await req.headers.cookie;
    if(cookie) {
        const token = cookie.split('=')[1];
        next()
    }
    else {
        console.log('Semothing went wrong!');
        res.send('Invalid Person!!')
    }
}

module.exports = {authorization, authentication};