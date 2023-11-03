const Router = require('express');
const todoRoute = require('./api/todoRoute');

const router = Router();

router.use('/todo', todoRoute);


module.exports = router;
