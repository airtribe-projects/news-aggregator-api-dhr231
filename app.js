const express = require('express');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRouter = require('./routes/newsRouter');

app.use(express.json());
app.use('/users',authRoutes);
app.use('/users',userRoutes);
app.use('/news',newsRouter);

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${PORT}`);
});



module.exports = app;