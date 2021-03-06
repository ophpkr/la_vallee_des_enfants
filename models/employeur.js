let db = require('../config/db');
let helper = require('../helpers/helper');
const bcrypt = require('bcrypt');

let Employeur = {

    /**
     *
     * @param email : Mail de l'employeur
     * @param callback : doit prendre un unique parametre
     */
    findOne: function (idEmployeur, callback) {
        db.query('SELECT * FROM public.employeur E WHERE E.id_employeur=$1',
            [idEmployeur],
            function (err, rst) {
                retour = {
                    erreur: null,
                    employeur: null,
                    statut: null
                };
               let e = helper.handleError(err, rst,"L'employeur demandé n\'existe pas");
                retour.erreur = e.erreur
                retour.statut = e.statut
                if(retour.erreur == null){
                    retour.employeur = {
                        id : rst.rows[0].id_employeur, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[0].nom_naissance_employeur,
                        nom_usage: rst.rows[0].nom_usage_employeur,
                        prenom: rst.rows[0].prenom_employeur,
                        rue: rst.rows[0].rue_employeur,
                        cp: rst.rows[0].cp_employeur,
                        ville: rst.rows[0].ville_employeur,
                        mail: rst.rows[0].mail_employeur,
                        tel: rst.rows[0].telephone_employeur,
                        identifiant: rst.rows[0].identifiant_connexion,
                        mdp: rst.rows[0].mot_de_passe
                    }
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            });
    },

    /**
     *
     * @param login
     * @param pwd
     * @param callback
     */
    match: function(login, pwd, callback){
        db.query(
            'SELECT * FROM public.employeur E WHERE E.identifiant_connexion=$1',
            [login],
            function (err, rst) {
                retour = {
                    erreur: null,
                    employeur: null,
                    statut: null
                };
                let e = helper.handleError(err, rst,'Identifiants de connexion non valides');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    // Load hash from your password DB.
                    bcrypt.compare(pwd, rst.rows[0].mot_de_passe, function(e, res) {
                        if(e){
                            retour.erreur = {
                                texte: e.toString()
                            }
                            retour.statut = 500
                        }else if(!res){
                            retour.erreur = {
                                texte: 'Identifiants de connexion non valides'
                            }
                            retour.statut = 500
                        }else{
                            retour.employeur = {
                                id : rst.rows[0].id_employeur, // peut etre qu'il faut pas le renvoyer
                                nom_naissance: rst.rows[0].nom_naissance_employeur,
                                nom_usage: rst.rows[0].nom_usage_employeur,
                                prenom: rst.rows[0].prenom_employeur,
                                rue: rst.rows[0].rue_employeur,
                                cp: rst.rows[0].cp_employeur,
                                ville: rst.rows[0].ville_employeur,
                                mail: rst.rows[0].mail_employeur,
                                tel: rst.rows[0].telephone_employeur,
                                identifiant: rst.rows[0].identifiant_connexion,
                                mdp: rst.rows[0].mot_de_passe

                            }
                            retour.statut = 200
                        }
                        callback(retour);
                    });
                }else{
                    callback(retour); // on passe en parametre l'objet retour
                    // il faudra verifier si une erreur existe ou non
                }

            });

    },

    /**
     *
     * @param callback
     */
    getAll: function (callback) {
        db.query('SELECT * FROM public.employeur','', function (err, rslt) {
            retour = {
                erreur: null,
                employeurs: null,
                statut: null
            };
            let e = helper.handleError(err, rst,'Aucun parents');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                var array = []
                for(var i = 0; i < rslt.rows.length; i++){
                    array.push({
                        id : rst.rows[i].id_employeur, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[i].nom_naissance_employeur,
                        nom_usage: rst.rows[i].nom_usage_employeur,
                        prenom: rst.rows[i].prenom_employeur,
                        rue: rst.rows[i].rue_employeur,
                        cp: rst.rows[i].cp_employeur,
                        ville: rst.rows[i].ville_employeur,
                        mail: rst.rows[i].mail_employeur,
                        tel: rst.rows[i].telephone_employeur,
                        identifiant: rst.rows[i].identifiant_connexion,
                        mdp: rst.rows[i].mot_de_passe,
                        nom_complet:  rst.rows[i].prenom_employeur + ' ' + rst.rows[i].nom_usage_employeur
                    })
                }
                retour.employeurs = array;
                retour.statut = 200
            }
            callback(retour); // on passe en parametre l'objet retour
            // il faudra verifier si une erreur existe ou non
        });
    },

    getEmployeursEnfants: function (callback) {
        db.query(
            'SELECT E2.nom_enfant, E2.prenom_enfant, E.nom_usage_employeur, E.nom_naissance_employeur, E.prenom_employeur, E.id_employeur\n' +
            'FROM public.employeur E, public.enfant E2, public.contrat C \n' +
            'WHERE C.id_employeur = E.id_employeur AND C.id_enfant = E2.id_enfant\n' +
            'GROUP BY E2.nom_enfant, E2.prenom_enfant, E.nom_usage_employeur, E.nom_naissance_employeur, E.prenom_employeur, E.id_employeur\n' +
            'ORDER BY E.prenom_employeur',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    resultats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun employeur et enfant');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id_employeur: rslt.rows[i].id_employeur,
                            prenom_enfant: rslt.rows[i].prenom_enfant,
                            nom_enfant: rslt.rows[i].nom_enfant,
                            nom_usage_employeur: rslt.rows[i].nom_usage_employeur,
                            nom_naissance_employeur: rslt.rows[i].nom_naissance_employeur,
                            prenom_employeur: rslt.rows[i].prenom_employeur,
                            nom_complet: rslt.rows[i].prenom_employeur + ' ' + rslt.rows[i].nom_usage_employeur + ' '
                                    + rslt.rows[i].nom_naissance_employeur
                        });
                    }
                    retour.resultats = array;
                    retour.statut = 200
                }
                callback(retour);
            }
        );
    },

    create: function (employeur, callback) {
        bcrypt.hash(employeur.mot_de_passe, 8, function (e, hash) {
            let retour = {
                statut: null,
                erreur: null
            };
            if(e) {
                retour.statut = 500
                retour.erreur = e.toString()
                callback(retour)
            } else {
                db.query("INSERT INTO public.employeur(nom_naissance_employeur, nom_usage_employeur, prenom_employeur, rue_employeur, cp_employeur, ville_employeur, mail_employeur, telephone_employeur, identifiant_connexion, mot_de_passe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id_employeur",
                    [employeur.nom_naissance_employeur.toUpperCase(), employeur.nom_usage_employeur.toUpperCase(),
                        helper.premiereLettreMaj(employeur.prenom_employeur), employeur.rue,
                        employeur.cp_employeur, employeur.ville_employeur, employeur.mail_employeur, employeur.telephone_employeur,
                        employeur.identifiant_connexion,  hash],
                    function (err, result) {

                        if (err) {
                            retour.statut = 500
                            retour.erreur = err.toString()
                        } else {
                            retour.statut = 200
                            retour.id = result.rows[0].id_employeur
                        }
                        callback(retour);
                    });
            }
        });

    },

    update: function (numEmployeur, employeur, callback) {
        db.query('UPDATE public.employeur SET nom_naissance_employeur = $1, nom_usage_employeur = $2, prenom_employeur = $3, rue_employeur = $4, cp_employeur = $5, ville_employeur = $6, mail_employeur = $7, telephone_employeur = $8, identifiant_connexion = $9, mot_de_passe = $10 WHERE id_employeur = $11',
            [employeur.nomNaissance.toUpperCase(), employeur.nomUsage.toUpperCase(), helper.premiereLettreMaj(employeur.prenom), employeur.rue, employeur.codePostal, employeur.ville, employeur.email, employeur.telephone1, employeur.identifiantConnexion, employeur.mdp, numEmployeur],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            })
    },

    updateInfosEmp: function (employeur, callback) {
        db.query('UPDATE public.employeur SET rue_employeur = $1, cp_employeur = $2, ville_employeur = $3, telephone_employeur = $4 WHERE id_employeur = $5',
            [employeur.rue, employeur.codePostal, employeur.ville, employeur.tel, employeur.id_employeur],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            })
    },

    updateMdp: function (idEmp, ancienMdp, nouveauMdp, reecrireMdp, callback) {
        db.query('SELECT * FROM public.employeur WHERE id_employeur = $1',
            [idEmp],
            function (err, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if(retour.erreur == null){
                    // On vérifie que l'ancien mot de passe rentré soit bien celui de la bd
                    bcrypt.compare(ancienMdp, result.rows[0].mot_de_passe, function(e, res) {
                        if(e){
                            retour.erreur = {
                                texte: e.toString()
                            }
                            retour.statut = 500
                        }else if(!res){
                            retour.erreur = {
                                texte: 'Mauvais mot de passe'
                            }
                            retour.statut = 500
                        }else{
                            if(nouveauMdp === reecrireMdp) {
                                bcrypt.hash(nouveauMdp, 8, function (e, hash) {
                                    if (e) {
                                        retour.erreur = {
                                            texte: e.toString()
                                        }
                                    }
                                    else {
                                        db.query("UPDATE public.employeur SET mot_de_passe = $1",
                                            [hash],
                                            function (err, result) {
                                                if (err) {
                                                    retour.statut = 500
                                                    retour.erreur = err.toString()
                                                }
                                                else {
                                                    retour.statut = 200
                                                }
                                            });
                                    }
                                });
                            }
                            else {
                                retour.erreur = {
                                    texte: 'Les mots de passe ne correspondent pas'
                                }
                            }
                            retour.statut = 200
                        }
                        callback(retour);
                    });

                }else{
                    callback(retour);
                }

            });
    }
};

module.exports = Employeur;