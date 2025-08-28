News Aggregator APIA RESTful API built with Node.js and Express for a personalized news aggregator. This project features secure user registration and login with JWT authentication, user preference management, and dynamic news fetching from an external API.Installation and SetupFollow these steps to get the project running on your local machine.Clone the Repositorygit clone <your-repository-url>
cd <repository-name>
Install DependenciesRun the following command to install all the necessary packages (express, bcrypt, jsonwebtoken, axios, express-validator).npm install
Create Configuration FileCreate a new file named config.js in the root directory of the project. This file will store your secret keys. You must sign up for a free API key from a news provider like NewsAPI.org or GNews.// config.js
module.exports = {
  JWT_SECRET: 'your-super-secret-key-for-jwt',
  NEWS_API_KEY: 'your-api-key-from-news-provider'
};
Start the ServerRun the following command to start the Express server. The server will run on http://localhost:3000.node app.js
Run TestsTo ensure everything is configured correctly, run the automated test suite.npm run test
API Endpoint DocumentationAll protected routes require an Authorization header with a Bearer Token: Authorization: Bearer <your_jwt>.Authentication (/users)POST /users/signupDescription: Registers a new user.Request Body:{
  "email": "test@example.com",
  "password": "password123",
  "preferences": ["technology", "business"]
}
Success Response:Code: 200 OKBody: User registered successfullyPOST /users/loginDescription: Logs in an existing user and returns a JWT.Request Body:{
  "email": "test@example.com",
  "password": "password123"
}
Success Response:Code: 200 OKBody:{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
User Preferences (/users)GET /users/preferencesDescription: Retrieves the authenticated user's preferences.Protected: Yes.Success Response:Code: 200 OKBody:{
  "preferences": ["technology", "business"]
}
PUT /users/preferencesDescription: Updates/replaces the authenticated user's preferences.Protected: Yes.Request Body:{
  "preferences": ["sports", "finance"]
}
Success Response:Code: 200 OKBody:{
  "preferences": ["sports", "finance"]
}
News (/news)GET /newsDescription: Fetches news articles based on the authenticated user's stored preferences.Protected: Yes.Success Response:Code: 200 OKBody:{
  "news": [
    {
      "title": "...",
      "description": "...",
      "url": "...",
      "image": "...",
      "publishedAt": "..."
    }
  ]
}
