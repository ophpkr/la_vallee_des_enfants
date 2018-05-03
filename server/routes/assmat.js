var express = require('express');
var router = express.Router();
const modelAssMat = require('../models/assMat');
const jwt = require('jsonwebtoken')

function jwtSignAssMat(assmat) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(assmat, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

// Express middlewares
const AuthentificationController = require('../controllers/AuthentificationController')

router.post('/register', function (req, res, next) {
    var assMat = req.body.assMat
    //console.log(req.body.assMat)
    modelAssMat.create(assMat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

router.post('/login', function (req, res, next) {
    var login = req.body.login;
    var pwd =  req.body.mdp;
    modelAssMat.match(login, pwd, function (retour) {
        if(retour.erreur == null){
            retour.token = jwtSignAssMat(retour.assmat)
        }
        res.send(retour)
    })
});

module.exports = router;