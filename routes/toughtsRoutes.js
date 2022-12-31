const expres = require('express');
const router = expres.Router();
const ToughtController = require('../controllers/ToughtController');

router.get('/', ToughtController.showToughts);

module.exports = router;