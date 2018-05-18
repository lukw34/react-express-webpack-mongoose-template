const Router = require('express').Router;
const router = new Router();

router.use('', (req, res) =>  res.send('ok'));


module.exports = router;