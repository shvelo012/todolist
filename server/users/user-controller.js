const signale = require('signale');
const pool = require('./../database');

const createUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const client = await pool.connect();

        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            client.release();
            return res.json({
                message: 'User with this email address already exists',
                status: 'fail',
                field: 'email'
            });
        }

        const insertQuery = 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
        const insertValues = [firstname, lastname, email, password];

        const insertResult = await client.query(insertQuery, insertValues);

        client.release();

        res.json({
            _id: insertResult.rows[0].id,
            status: 'ok'
        });
    } catch (e) {
        signale.fatal('Error occurred in createUser', e);

        res.status(500).send('Internal server error');
    }
};

module.exports = {
    createUser
};
