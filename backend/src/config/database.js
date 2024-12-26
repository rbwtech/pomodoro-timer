const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Tambahkan opsi ini untuk mengatasi masalah autentikasi
    authPlugins: {
        mysql_native_password: () => () => Buffer.from(process.env.DB_PASS + '\0')
    }
});

module.exports = pool;