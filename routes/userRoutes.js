const express = require('express');
const router =  express.Router();
const authenticateToken = require('../authMiddleware');

const {userPreferences} = require('../dataStore');

// router.get('/preferences', authenticateToken, (req, res) => {
//     const username = req.user.username;
//     const preferences = userPreferences[username];

//     if(!preferences){
//         return res.status(404).send('Preferences not found for this user');
//     }

//     res.json(preferences);
// });

router.put('/preferences', authenticateToken, (req, res) => {
    const username = req.user.username;

    // Get the new preferences from the request body
    const newPreferences = req.body;

    // Update the preferences for the logged-in user
    userPreferences[username] = newPreferences;

    console.log(`Updated preferences for ${username}:`, newPreferences);

    res.send('Preferences updated successfully');
});

module.exports = router;