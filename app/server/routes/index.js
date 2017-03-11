const Router = require('express').Router,
    router = new Router();

router.use('/api', (req, res) => res.send('ok'));


module.exports = router;
