
// ===========
// Puerto
// ===========
process.env.PORT = process.env.PORT || 3001;

// ==================
// Entorno
// ==================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==================
// Vencimiento del token
// ==================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.EXPIRE_TOKEN = '48h';

// ==================
// SEED de autenticacino
// ==================

process.env.SEED_AUTENTICATION = process.env.SEED_AUTENTICATION || 'secret';


let urlDB;

if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;