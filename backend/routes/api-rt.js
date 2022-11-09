const router = require('express').Router();
const {check, getresults, setdb, addresult} = require('../controllers/api-cnt');

router.route('/check')
    .post(check);

router.route('/getresults')
    .post(getresults);

router.route('/setdb')
    .post(setdb);

router.route('/addresult')
    .post(addresult);

module.exports = router;