const { Router } = require('express');

const router = new Router();

router.use('', (req, res) => res.send('ok'));


module.exports = router;