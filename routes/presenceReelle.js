var express = require('express');
var router = express.Router();
var modelPresenceReelle = require('../models/presenceReelle');


/* --------------------------------------- ROUTES GET ----------------------------------------------------------- */

router.get('/existe', function (req, res, next) {
    let date = new Date (req.query.date.substring(0,15))
    let enfant = parseInt(req.query.enfant)
    modelPresenceReelle.existePresenceReelle(date, enfant, function (retour) {
        res.send(retour);
    });
});
router.get('/allBefore/:date', function (req, res) {
    let date = req.params.date
    if (req.query.numContrat) {
        let numContrat = req.query.numContrat
        console.log("++++°+====", numContrat)
        modelPresenceReelle.getAllForContratbeofre(numContrat, date, function (retour) {
            console.log(retour)
            res.send(retour)
        })
    } else {
        modelPresenceReelle.getAllBefore(date, function (retour) {
            console.log(retour)
            res.send(retour)
        })
    }
})
router.get('/all/:annee/:numMois/:numC', function (req, res, next) {
    let annee = req.params.annee
    let mois = req.params.numMois
    let numC = req.params.numC
    console.log('router' + annee + '  ' + mois + '   ' + numC)
    modelPresenceReelle.getAllPresencesDuMois(annee, mois, numC, function (retour) {
        res.send(retour);
    });
});



/* --------------------------------------- ROUTES POST ----------------------------------------------------------- */

router.post('/create', function (req, res, next) {
    let preelle = req.body.presence
    preelle.datepresencereelle = new Date(preelle.datepresencereelle)
    modelPresenceReelle.create(preelle, function (retour) {
        res.send(retour);
    });
});

router.post('/createPresExc', function (req, res, next) {
    let preelle = req.body.presence
    console.log('azertyuvhbgdtq     ' + preelle.id)
    preelle.datepresencereelle = new Date(preelle.datepresencereelle)
    modelPresenceReelle.createPresExc(preelle, function (retour) {
        res.send(retour);
    });
});

router.post('/createAbs', function (req, res, next) {
    let abs = req.body.absence
    abs.datepresencereelle = new Date(abs.datepresencereelle)
    modelPresenceReelle.createAbs(abs, function (retour) {
        res.send(retour);
    });
});

/* --------------------------------------- ROUTES PUT ----------------------------------------------------------- */

router.put('/majHeureArrivee', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateHeureArrivee(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majHeureDepart', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateHeureDepart(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majGouter', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateGouter(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majFactureAssociee', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateFactureAssociee(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majAbs', function (req, res, next) {
    let abs = req.body.absence
    console.log(abs)
    modelPresenceReelle.updateAbs(abs, function (retour) {
        res.send(retour);
    });
});

module.exports = router;