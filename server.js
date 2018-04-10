const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Channel = require('./models/channel');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

const Channels = [];

const getChannel = (channelId) => {
    return Channels.find( id => {
        return channelId == id;
    });
};

if(process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/channel');
}

app.get('/channels', (req, res) => {
    res.json(Channels);
})

app.post('/channels', (req, res) => {
    console.log(req.body);
    var channel = new Channel(req.body.name);
    Channels.push(channel);
    res.json(Channels);
});

app.get('/channels/:id', (req, res) => {
    const channel = getChannel(req.body.id);
    
    var messages = channel.messages.map((message) => {
        return message;
    })
    res.json(messages);
});



app.post('/channels/:id', (req, res) => {
    const channel = Channels.find(channel => {
        return channel.id === req.params.id;
    });

    channel.addMessage(req.body.user, req.body.message);
    res.json(channel.messages);
})

app.listen(PORT, () => {
    console.log("Connected on port:" + PORT);
});

