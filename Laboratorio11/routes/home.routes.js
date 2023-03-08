const { Router } = require('express');
const { sendHtml } = require('../utils');
const router = Router();

router.get('/', (req, res) => {
    sendHtml('./pages/index.html', res);
});

module.exports = router;