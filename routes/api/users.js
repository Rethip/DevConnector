const express= require('express');
const router = express.Router ();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//const jwt = require ('jsonwebtoken');
//const keys = require('../../config/keys');
//const passport = require('passport');



//load user model
const User = require ('../../models/User');


// @route post api/users/register
//@desc register now
// @access public

router.post('/register',(req,res) => {
    User.findOne({email: req.body.email}).then(user=> {
        if (user)
        { 
            return res.status(400).json({email:'email exists'});
        }
        else
        {
          const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'});
          const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: avatar
            });

            bcrypt.genSalt(10,(err,salt) =>{
                if(err){
                    return res.status(400).json({password:'failed encrypting'})
                       }
                bcrypt.hash(newUser.password,salt,(err,hash) =>
                {
                   if(err){  
                       return res.status(400).json({password:'hashing error'});
                           }
                newUser.password = hash;
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
                })
                

            })
        }
        

    }) 
    .catch(err=>console.log(err));
});

// @login post api/users/register
// @login user
// @access public

router.post('/login',(req,res)=>
{   const email =req.body.email;
    const password = req.body.password;
    User.findOne ({email}) //email:email declaration not available
    .then(user => {
        if(!user){
            return res.status(400).json({email:'user not found'});
        }
        //check password
        bcrypt.compare(password,user.password).then(isMatch =>
        {
            if (isMatch)
            {
                return res.json({msg:'success'});
            }
            return releaseEvents.status(400).json({password:'incorrect password'});

        }); //can skip catch at times
    })
})

//@route get api
/*router.get(
    '/current',
    passport.authenticate('jwt',{session:false}),
    (req,res) => {
        res.json({msg:'success'});
    }
)*/





module.exports = router;