const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database');


router.get('/login', function(req, res, next) {
    
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

/* POST login credentials. */
router.post('/login', function(req, res) {
    const emailAddress = req.body.email_address;
    const password = req.body.password;

    const sql = 'SELECT * FROM registration WHERE email_address = ? AND password = ?';
    db.query(sql, [emailAddress, password], function(err, data, fields) {
        if (err) throw err;

        if (data.length > 0) {
            req.session.loggedinUser = true;
            req.session.emailAddress = emailAddress;
            res.redirect('/expense');
        } else {
            // Redirect to the login page with an error query parameter
            res.redirect('/login?error=1');
            
        }
    });
});

module.exports = router;
