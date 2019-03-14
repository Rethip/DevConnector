const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');


app.get('/',(req,res)=>res.send("hello world "));
//let's write our first route
 app.use('/api/users',users);
 app.use('/api/profile',profile);
 app.use('/api/posts',posts);

const port = process.env.port || 5200;
app.listen(port,() => console.log(`server running on port ${port}`));

//const bodyparser = require('body-parser');

const db = require('./config/keys').mongoURI;

//connect to db
mongoose
 .connect(db)
 .then(()=> console.log('mdb connected'))
 .catch(err => console.log(err));





// body parser api middleware
//app.use(bodyparser.urlencoded({extended:false}))
//app.use(bodyparser.json());
//Connect to db
//mongoose.connect(db)
         //.then(() => console.log('mong db conneected'))
         //.catch(err => console.log(err));

