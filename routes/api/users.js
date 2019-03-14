const express= require('express');
const router = express.Router ();

router.get('/test',(req,res) => res.json({msg:'users api works'}));
module.exports = router;

//load user model
//const user = require ('../../models/user');

// @route post api/users/register
//@desc register now
// @access public
//router


//module.exports = router