const expres = require('express');
const router = expres.Router();
const ToughtController = require('../controllers/ToughtController');
const checkAuth =  require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ToughtController.createTought);
router.get('/edit/:id', checkAuth, ToughtController.uptadeTought);
router.post('/edit', checkAuth, ToughtController.uptadeToughtSave);
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought);
router.get('/', ToughtController.showToughts);

module.exports = router;