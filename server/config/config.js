
// ===========
// Puerto
// ===========
process.env.PORT = process.env.PORT || 3000;

// ==================
// Entorno
// ==================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://nata:7vSUaWJBviY7qvC@cafe.o4w01.mongodb.net/cafe';
}

process.env.URLDB = urlDB;