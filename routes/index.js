var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const USER = require("../models/user.model")
const secretKey = "testproject"
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  const admin_save = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const find_user = await USER.find({ username: admin_save.username })
    if (!find_user) {
      res.send({ statusCode: 404, message: "Incorrect Cred" })
    }
    if (find_user[0] && atob(find_user[0].password) === admin_save.password) {
      jwt.sign(find_user[0].toJSON(), secretKey, {expiresIn:"24h"},(err, token) => {
        if (err) {
          res.send({ statusCode: 500, message: 'Failed to generate token.' })
        }
        res.send({ statusCode: 200, message: {token:token , role:find_user[0].role , name:find_user[0].username} })

      })
    }
  } catch (error) {
    console.log(error)
    res.send({ statusCode: 400, message: "Server Error" })

  }
})
module.exports = router;
