const uuid = require('uuid/v4');

class Channel {
    constructor(name) {
        this.id = uuid('name', 'channel');
        this.name = name;
        this.users = [];
        this.messages = [];
        this.addMessage = function(user, message){
            this.messages.push({user, message});
        }
    }
}

module.exports = Channel;