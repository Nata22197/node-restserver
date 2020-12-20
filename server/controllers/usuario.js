const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const controller = {

    getUsers: (req, res) => {

        let from = req.query.from || 0;
        from = Number(from);
    
        let limit = req.query.limit || 5;
        limit = Number(limit);
    
        Usuario.find( { estado:true }, 'nombre email role estado google img')
        .skip(from)
        .limit(limit)
        .exec( (err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado:true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cant: conteo
                });
            });
        });
    },
    
    saveUser: (req, res) => {

        const body = req.body;
        
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });
    
        usuario.save( (err, usuarioDB) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok:true,
                usuario: usuarioDB
            });
    
        });
    },

    updateUser: (req, res) => {
        const id = req.params.id;
        const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    
        Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
    
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;
        // User.findByIdAndRemove(id, (err, usuarioBorrado) => {
        Usuario.findById(id, (err, user) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El usuario no existe en la base de datos'
                    }
                });
            }

            if (!user.estado) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El usuario no existe en la base de datos'
                    }
                });
            }

            user.estado = false;
            user.save();

            res.json({
                ok: true,
                usuario: user
            });
    
        });
    }

};

module.exports = controller;