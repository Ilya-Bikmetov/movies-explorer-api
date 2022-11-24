const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { updateProfileValidator } = require('../middlewares/validators');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfileValidator, updateProfile);

module.exports = router;
