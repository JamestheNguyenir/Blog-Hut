const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

//express app

const app = express();
//connect to mongodb
const dbURI = 'mongodb+srv://james:lol123@noder.cynorwn.mongodb.net/noder?retryWrites=true&w=majority&appName=NODER';

mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));
//register view engine
app.set('view engine','ejs');


//static files (files that are shared with frontend browser)
app.use(express.static('public'))

//3rd party middleware 
app.use(express.urlencoded({encoded:true}))
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{

   res.redirect('/blogs');
});
app.get('/about',(req,res)=>{

    res.render('about',{title: "| about"});
    
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  // 404 page
  app.use((req, res) => {
    res.status(404)
  })