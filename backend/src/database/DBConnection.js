const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file


const pool = new Pool({
    user: process.env.DB_USER || 'postgres', 
    host: 'localhost',
    database: 'playvia',
    password: process.env.DB_PASS || '0000', 
    port: 5432, 
});

pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database:', err);
    });

module.exports = pool;
