const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 12);
        return hash;
    } catch (error) {
        console.error('Error hashing password: ', error);
        throw error;
    }
};

module.exports = {
    encrypt
};
