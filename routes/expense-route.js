const express = require('express');
const path = require('path');
const router = express.Router();

/* GET users listing. */
router.get('/expense', function(req, res, next) {
    if(req.session.loggedinUser){
        res.sendFile(path.join(__dirname, '../views/expense.html'));
    }else{
        res.redirect('/login');
    }
});
module.exports = router;