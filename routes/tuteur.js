var express = require('express');
var router = express.Router();
var modelTuteur = require('../models/tuteur')


router.post('/create', function (req, res, next) {
    var tuteur = req.body.tuteur
    modelTuteur.create(tuteur, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

module.exports = router;