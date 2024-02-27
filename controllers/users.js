const db = require('../database/calls/users');

const createUser = async (req, res) => {
    try {
        const create_user = await db.createUser(req);
        
        if (!create_user) {
            res.status(400).json({message: "User exists!"});
        } else {
            res.status(200).json({
                message: "Register successful!",
                user_id: create_user[0].user_id
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const user_data = await db.loginUser(req);

        if (!user_data) {
            console.log(user_data);
            res.status(400).json({message: "Invalid credentials!"});
        } else {
            res.status(200).json({
                message: "Login successful!",
                user_data: user_data
            })
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createUser,
    loginUser
}