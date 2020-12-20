const Usuario = require('../models/usuario');
// =======================
// Verificar ROLE
// =======================

const verifyRole = (req, res, next) => {

    const id = req.user._id;
    Usuario.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'No posee los permisos suficientes para esta accion'
                }
            });
        }

        if (user.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El usuario no posee el rol suficiente para realizar esta accion'
                }
            });
        }
    });

};

module.exports = {
    verifyRole
}