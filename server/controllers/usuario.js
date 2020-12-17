const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

let controller = {

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

        let body = req.body;
        console.log(body);
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });
    
        usuario.save( (err, usuarioDB) => {
    
            if (err) {
                return res.status(400).json({
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
        let id = req.params.id;
        let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    
        Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) => {
            
            if (err) {
                return res.status(400).json({
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
        let id = req.params.id;
        let cambioEstado = {
            estado: false
        };
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        Usuario.findByIdAndUpdate(id, cambioEstado, {new:true},(err, usuarioBorrado) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
            }
    
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
    
        });
    }

};

module.exports = controller;