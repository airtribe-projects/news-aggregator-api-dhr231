const express = require('express');
const router =  express.Router();
const authenticateToken = require('../authMiddleware');

const { user } = require('../dataStore');

router.get('/preferences', authenticateToken, (req, res) => {

    if (!req.tuser || !req.tuser.preferences) {
        return res.status(404).send('Preferences not found for this user');
    }

    // Return in the shape the test expects
    res.json({ preferences: req.tuser.preferences });
});

router.put('/preferences', authenticateToken, (req, res) => {
    // const username = req.user.email;

    // // Get the new preferences from the request body
    // const newPreferences = req.body;

    // // Update the preferences for the logged-in user
    // userPreferences[username] = newPreferences;

    // // console.log(`Updated preferences for ${username}:`, newPreferences);

    // // res.send('Preferences updated successfully');
    // res.json({ preferences: newPreferences });

    const tuser = user.find(u => u.email === req.tuser.email);
    if (!tuser) {
        return res.status(404).send('User not found');
    }

    const { preferences } = req.body;
    tuser.preferences = preferences; // Update the user object in the central store

    res.json({ preferences: tuser.preferences });
});

module.exports = router;