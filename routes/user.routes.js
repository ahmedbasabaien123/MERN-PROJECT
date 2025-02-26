const  router = require('express').Router(); 

const authController = require ('../controlers/auth.Controler');

router.post("/register", authController.SingUp);

module.exports = router;