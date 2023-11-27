const { Router } = require('express');
const route = Router();


route.get('/', (req, res) => {
    return res.json('ok');
})


module.exports = route;