const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const controller = {

    login: (req, res) => {

        const body = req.body;

        Usuario.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o password incorrectos'
                    }
                });
            }

            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o password incorrectos'
                    }
                });
            } 

            const token = jwt.sign({
               usuario: userDB,

            }, process.env.SEED_AUTENTICATION , {expiresIn: process.env.EXPIRE_TOKEN});

            res.json({
                ok: true,
                usuario: userDB,
                token
            });

        });
    
    }

};

module.exports = controller;