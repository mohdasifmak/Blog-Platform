const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const ejsMate = require("ejs-mate");
const courseRoutes = require('./Routes/courseRoutes');
const blogRoutes = require('./Routes/blogRoutes');


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.use('/courses', courseRoutes);
app.use('/blogs', blogRoutes);


app.get('/', (req, res) => {
    res.render('index');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
