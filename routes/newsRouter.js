const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware');
const axios = require('axios');
const { NEWS_API_KEY } = require('../config');

// GET / - Fetch news for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        // 1. Get preferences directly from the user object attached by the middleware
        const preferences = req.tuser.preferences;

        if (!preferences || preferences.length === 0) {
            return res.status(400).json({ message: "User has no categories set in preferences." });
        }

        // 2. Build the query from the user's preferences
        const query = preferences[0];
        const encodedQuery = encodeURIComponent(query);

        const url = `https://newsapi.org/v2/everything?q=${encodedQuery}`;

        // const response = await axios.get(url);
        // const articles = response.data.articles;

        // // 3. Return the news in the shape the test expects
        // res.json({ news: articles });

        const response = await axios.get(url, {
            headers: {
                'Authorization': NEWS_API_KEY
            }
        });

        const articles = response.data.articles;
        res.json({ news: articles });


    } catch (error) {
        console.error('Error fetching news:', error.message);
        return res.status(500).json({ message: 'Error fetching news' });
    }
});

module.exports = router;
