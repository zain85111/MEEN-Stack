const express = require("express");
const Blog = require('../models/blog')
const router = express.Router();

router.get('/blogs/create', (req, res) => {
    res.render('create-blog.ejs',{title:'Create Blog'});
});


router.post('/add-blog', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log("Blog Saved!");
            res.redirect('/')
        }).catch((err) => {
            console.log(err)
        })
})

router.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index.ejs',{title:'Home',blogs:result});
        }).catch((err) => {
            console.log(err)
        })

});

router.get('/blog/:id', (req, res ) => {
    Blog.findById(req.params.id)
        .then((result) => {
            res.render('blog-details.ejs',{title:'Blog',blog:result});
        }).catch((err) => {
            console.log(err)
            res.status(404).render('404.ejs',{title:"Page Not Found"});
        })
});

router.delete('/delete-blog/:id', (req, res) => {
    
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({redirect:'/'})
        }).catch((err) => {
            console.log(err)
            res.status(404).render('404.ejs',{title:"Page Not Found"});
        })
});

module.exports = router;