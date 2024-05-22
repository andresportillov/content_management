const bcrypt = require('bcryptjs');

const salt = async (num = 10) => {
    return await bcrypt.genSalt(10);
}

module.export = {
    salt
}