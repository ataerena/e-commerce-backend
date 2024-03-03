const { 
    GET_ALL_USERS,
    CHECK_USER_EXISTS,
    CREATE_USER,
    GET_USER_PASSWORD_BY_USERNAME,
    GET_USER_BY_LOGIN
} = require('../queries/users');

const bcrypt = require('bcrypt');
const { encrypt } = require('../../middlewares/encryption');

const { pool } = require('../connection');

const createUser = async (req, res) => {
    try {
        const hashedUserPassword = await encrypt(req.body.user_pwd);
        const check_user_data = [
            user_email = req.body.user_email,
            username = req.body.username
        ];
        const user_data = [
            user_firstname = req.body.user_firstname, 
            user_lastname = req.body.user_lastname, 
            user_email = req.body.user_email, 
            user_birth = req.body.user_birth,
            user_gender = req.body.user_gender, 
            user_country = req.body.user_country, 
            user_city = req.body.user_city, 
            user_district = req.body.user_district, 
            user_address = req.body.user_address,
            user_pwd = hashedUserPassword,
            username = req.body.username
        ];

        var client = await pool.connect();
        const check_user = await client.query(CHECK_USER_EXISTS, check_user_data);
        
        if (check_user.rows.length > 0) {
            return false;
        } else {
            const result = await client.query(CREATE_USER, user_data);
            return result.rows;
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        client.release();
    }
}

const loginUser = async (req, res) => {
    try {
        const pwd_check = [
            username = req.body.username
        ];
        const user_pwd = req.body.user_pwd;
        var client = await pool.connect();
        const stored_pwd = await client.query(GET_USER_PASSWORD_BY_USERNAME, pwd_check);
        if (stored_pwd.rows[0].user_pwd.length > 0) {
            const hashedUserPassword = stored_pwd.rows[0].user_pwd;

            return new Promise( (resolve) => {
                bcrypt.compare(user_pwd, hashedUserPassword, async (err, result) => {
                    if (err) {
                        resolve(false); // internal error when comparing password - decryption failiure
                    } else {
                        const user_data = await client.query(GET_USER_BY_LOGIN, pwd_check);
                        
                        if (result) {
                            resolve(user_data.rows[0]);
                        } else {
                            resolve(false) // user exists but password is incorrect
                        }
                    }
                })
            })
        } else {
            return false; // user doesn't exist or the request could not be satisfied
        }
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}


module.exports = {
    createUser,
    loginUser
}