const DB = "backendapi";

const CREATE_USER = {
    text: `INSERT INTO ${DB}.users(user_firstname, user_lastname, user_email, user_birth, user_gender, user_country, user_city, user_district, user_address, user_pwd, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING user_id;`
}
const GET_ALL_USERS = {
    text: `SELECT * FROM ${DB}.users ORDER BY user_id ASC;`
} 
const GET_USER_PASSWORD_BY_USERNAME = {
    text: `SELECT user_pwd FROM ${DB}.users WHERE username = $1;`
}
const GET_USER_BY_LOGIN = {
    text: `SELECT user_id, user_firstname, user_lastname, user_email, user_birth, user_gender, user_country, user_city, user_district, user_address, username FROM ${DB}.users WHERE username = $1;`
}
const CHECK_USER_EXISTS = {
    text: `SELECT FROM ${DB}.users WHERE user_email = $1 OR username = $2;`
}


module.exports = {
    CREATE_USER,
    GET_ALL_USERS,
    GET_USER_PASSWORD_BY_USERNAME,
    GET_USER_BY_LOGIN,
    CHECK_USER_EXISTS
}