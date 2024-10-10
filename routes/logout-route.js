const express = require('express');
const router = express.Router();

/* GET logout route. */
router.get('/logout', function(req, res) {
  // Destroy the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session during logout:', err);
      return res.redirect('/expense'); // Handle error by redirecting to a fallback page
    }
    // Redirect to the login page after successful logout
    res.redirect('/login');
  });
});

module.exports = router;
