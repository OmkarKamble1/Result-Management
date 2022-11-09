const router = require('express').Router();
const teacherController = require('../controllers/teacher-cnt');

router.route('/teacherlogin')
    .post(teacherController.login);

module.exports = router;