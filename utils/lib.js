const bcrypt = require('bcryptjs');

const salt = async (num = 10) => {
    return await bcrypt.genSalt(num);
}

module.export = {
    salt
}