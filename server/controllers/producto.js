const Producto = require('../models/producto');

const controller = {
    saveProduct: (req, res) => {

        const body = req.body;

        let producto = new Producto({
            usuario: req.user._id,
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            disponible: body.disponible,
            categoria: body.categoria
        });
    
        producto.save( (err, productDB) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.status(201).json({
                ok:true,
                producto: productDB
            });
    
        });
    },

    updateProduct: (req, res) => {
        const id = req.params.id;
        const body = req.body;

        Producto.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, productDB) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
    
            if (!productDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe en la base de datos'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productDB
            });
        });
    },

    deleteProduct: (req, res) => {
        const id = req.params.id;

        Producto.findById(id, (err, productDB) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if (!productDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe en la base de datos'
                    }
                });
            }

            if (!productDB.disponible) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe en la base de datos'
                    }
                });
            }

            productDB.disponible = false;
            productDB.save((err, productDelete) => {
                if (err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }
                
                res.json({
                    ok: true,
                    producto: productDelete
                });
            })

        });
    },

    getProductById: (req, res) => {
        const id = req.params.id;
        Producto.findById(id) 
        .populate('usuario', 'email')
        .populate('categoria', 'descripcion')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if (!productDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe en la base de datos'
                    }
                });
            }

            if (!productDB.disponible) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe en la base de datos'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productDB
            });

        });
    },

    getProducts: (req, res) => {
        
        let from = req.query.from || 0;
        from = Number(from);

        Producto.find({disponible:true})
        .sort('nombre')
        .skip(from)
        .limit(5)
        .populate('usuario', 'email')
        .populate('categoria', 'descripcion')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: products
            });

        });
    },

    searchProduct: (req, res) => {
        
        const termino = req.params.termino;
        const regex = new RegExp(termino, 'i');

        Producto.find({nombre:regex}) 
        .populate('usuario', 'email')
        .populate('categoria', 'descripcion')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: products
            });
        });
    }
};

module.exports = controller;