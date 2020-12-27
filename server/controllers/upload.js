const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const path = require('path');
const fs = require('fs');

const controller = {

    upload:(req, res) => {

        const type = req.params.tipo;
        const id = req.params.id;

        if (!req.files) {
            return res.status(400)
                .json({
                    ok: false,
                    err: {
                        message: 'No se ha seleccionado ningun archivo'
                    }
                });
        }

        const tiposValidos = ['productos', 'usuarios'];

        if (tiposValidos.indexOf(type) < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Las tipos permitidos son ' + tiposValidos.join(', ')
                }
            });
        }

        const sampleFile = req.files.archivo;
        const nameSplit = sampleFile.name.split('.');
        const extension = nameSplit[nameSplit.length -1];
        // Extensiones permitidas
        const extensionsValids = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionsValids.indexOf(extension) < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Las extensiones permitidas son ' + extensionsValids.join(', '),
                    ext: extension
                }
            });
        }

        // Cambiar nombre al archivo
        const nameFile = `${id}-${ new Date().getMilliseconds() }.${extension}`;

        sampleFile.mv(`uploads/${type}/${nameFile}`, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            // Aqui se cargo la imagen
            if (type === 'usuarios') {
                imageUser(id, res, nameFile);
            } else {
                imageProduct(id, res, nameFile);
            }
        })
    }

}

function imageUser(id, res, nameFile) {
    Usuario.findById(id, (err, userDB) => {
        
        if (err) {
            removeFile(nameFile, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            removeFile(nameFile, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        removeFile(userDB.img, 'usuarios');
        userDB.img = nameFile;

        userDB.save( (err, userSave) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true, 
                usuario: userSave,
                img: nameFile
            })

        });

    });
}

function removeFile(nameFile, type, ) {
    const pathImage = path.resolve(__dirname, `../../uploads/${type}/${nameFile}`);
    // Verifico si la imagen ya existe, la borro
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }

}

function imageProduct(id, res, nameFile) {
    Producto.findById(id, (err, productDB) => {
        
        if (err) {
            removeFile(nameFile, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            removeFile(nameFile, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        removeFile(productDB.img, 'productos');
        productDB.img = nameFile;

        productDB.save( (err, productSave) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true, 
                producto: productSave,
                img: nameFile
            })

        });

    });
}

module.exports = controller;