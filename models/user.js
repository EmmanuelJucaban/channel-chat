const uuid = require('uuid/v4');

class User {
    constructor(name) {
        this.name = name;
        this.name = uuid(name, "user")
    }
}

module.exports = User;