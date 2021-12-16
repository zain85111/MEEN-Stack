const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog')
const blogRoutes = require("./routes/blogRoutes")


const app = express();


const DB_URI = 'mongodb+srv://bitf18m045:dbmongo@cluster0.hyzdc.mongodb.net/myDB?retryWrites=true&w=majority';
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then((result) => {
    console.log("DB connection successful!");
    app.listen(5000, () => {
        console.log('Listening on port:5000');
    });
    
}).catch((err)=>{console.log(err)})



app.set('view-engine', 'ejs');

// For static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'));



// Home Page
app.get('/', (req, res) => {
    res.redirect("/blogs")
});

// About Page
app.get('/about', (req, res) => {
    res.render('about.ejs',{title:'About'});
});

// Blog Routes
app.use(blogRoutes);


// 404 page render
app.use((req, res) => {
    res.status(404).render('404.ejs',{title:"Page Not Found"});
})