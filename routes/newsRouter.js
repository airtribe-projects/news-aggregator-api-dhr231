const express = require('express');
const router= express.Router();
const authenticateToken = require('../authMiddleware');
const axios = require('axios');
const {NEW_API_KEY} = require('../config');
const { userPreferences } = require("../dataStore");

router.get('/', authenticateToken, async (req,res) => {
    try{
        const username = req.user.username;
        const preferences = userPreferences[username];
        if(!preferences || !preferences.categories || preferences.categories.length === 0){
            return res.send(400).json({ message:"User has no categories set in preferences."});
        }

        const query = preferences.categories.join(' OR ');
        const encodeQuery = encodeURIComponent(query);
        const url = `https://gnews.io/api/v4/search?q=${encodeQuery}&token=${NEW_API_KEY}`;
        console.log(`Fetching news for query: ${query}`); // For debugging
        const response = await axios.get(url);
        const articles = response.data.articles;
        res.json({articles : articles});
    }

    catch(error){
        console.error('Error fetching news :', error);
        res.status(500).json({message :'Error fetching news'});
    }
});

module.exports = router;
