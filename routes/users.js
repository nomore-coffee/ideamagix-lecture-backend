var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const USER = require("../models/user.model")
const authorize = require("../middleware/authorize")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registerAdmin',async(req,res)=>{
  const admin_save = new USER({
    username:req.body.username,
    password:btoa(req.body.password),
    role:"admin"
  })
  try {
await admin_save.save()
  res.send({statusCode:200 , message:"Admin Register"})
} catch (error) {
  res.send({statusCode:400 , message:"Duplicate Admin"})
    
}

})
router.post('/registerInstructors',authorize(['admin']),async(req,res)=>{
  const admin_save = new USER({
    username:req.body.username,
    password:btoa(req.body.password),
    role:"instructors"
  })
  try {
await admin_save.save()
  res.send({statusCode:200 , message:"Instructors Register"})
} catch (error) {
  res.send({statusCode:400 , message:"Duplicate Instructors"})
    
}
})

module.exports = router;
