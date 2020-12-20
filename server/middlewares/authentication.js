const jwt = require('jsonwebtoken');

// =======================
// Verificar Token
// =======================

const verifyToken = (req, res, next) => {

    const token = req.get('Authorization');

    jwt.verify( token, process.env.SEED_AUTENTICATION, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        
        req.user = decoded.usuario;
        next();

    });


};

module.exports = {
    verifyToken
}