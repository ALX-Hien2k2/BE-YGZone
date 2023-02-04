const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello! This is the userRouter');
});

module.exports = router