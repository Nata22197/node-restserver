const Categoria = require('../models/categoria');

const controller = {
    saveCategory: (req, res) => {

        const body = req.body;
        
        let categoria = new Categoria({
            descripcion: body.descripcion,
            usuario: req.user._id
        });
    
        categoria.save( (err, categoryDB) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok:true,
                categoria: categoryDB
            });
    
        });
    },

    updateCategory: (req, res) => {
        const id = req.params.id;
        const body = req.body;

        Categoria.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, categoryDB) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
    
            if (!categoryDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'La categoria no existe en la base de datos'
                    }
                });
            }

            res.json({
                ok: true,
                categoria: categoryDB
            });
        });
    },

    deleteCategory: (req, res) => {
        const id = req.params.id;

        Categoria.findByIdAndRemove(id, (err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if (!categoryDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'La categoria no existe en la base de datos'
                    }
                });
            }

            res.json({
                ok: true,
                categoria: categoryDB
            });

        });
    },

    getCategoryById: (req, res) => {
        const id = req.params.id;
        Categoria.findById(id, (err, categoryDB) => {

            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if (!categoryDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'La categoria no existe en la base de datos'
                    }
                });
            }

            res.json({
                ok: true,
                categoria: categoryDB
            });

        });
    },

    getCategories: (req, res) => {
        Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categories) => {

            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias: categories
            });

        });
    }
};

module.exports = controller;