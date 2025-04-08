const pool = require('../database/DBConnection'); // Import the database connection

const createUser = async (username, email, password, profilePicture) => {


    const result = await pool.query(
        'INSERT INTO users (username,email,password,pfp) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, password, profilePicture]
    );
    return result.rows[0];

};

module.exports = {
    createUser,
};