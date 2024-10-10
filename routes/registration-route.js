const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database');

// Serve the registration form HTML
router.get('/register', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Handle user registration on form submission
router.post('/register', function(req, res, next) {
    
    const inputData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        password: req.body.password,
        created_at: new Date()
    };

    const confirmPassword = req.body.confirm_password;

    // Check if email already exists
    const sql = 'SELECT * FROM registration WHERE email_address = ?';
    db.query(sql, [inputData.email_address], function(err, data, fields) {
        if (err) throw err;

        let msg;

        if (data.length > 0) {
            msg = inputData.email_address + " already exists.";
        } else if (confirmPassword !== inputData.password) {
            msg = "Password and Confirm Password do not match.";
        } else {
            // Save user data into the database
            const insertSql = 'INSERT INTO registration SET ?';
            db.query(insertSql, inputData, function(err, data) {
                if (err) throw err;
            });
            msg = "You are successfully registered!";
        }

        // Redirect to registration page with query parameter for message
        res.redirect(`/register?msg=${encodeURIComponent(msg)}`);
    });
});

module.exports = router;
