const db = require('../database/calls/users');

const createUser = async (req, res) => {
    try {
        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                const element = req.body[key];
                if (!element) {
                    res.status(400).json({message: req.t("auth.register.invalid_form")})
                    return;
                }
            }
        }


        const create_user = await db.createUser(req);
        
        if (!create_user) {
            res.status(400).json({message: req.t("auth.register.exists")});
        } else {
            res.status(200).json({
                message: req.t("auth.register.success"),
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
            res.status(400).json({message: req.t("auth.login.invalid")});
        } else {
            res.status(200).json({
                message: req.t("auth.login.success"),
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