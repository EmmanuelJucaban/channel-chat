const express = require('express');
const User = require('./models/user');
const Channel = require('./models/channel');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json())


const Channels = [];

const getChannel = (channelId) => {
    return Channels.find( channel => {
        return channelId === channel.id;
    });
};

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
    const channel = getChannel(req.params.id);
    
    var messages = channel.messages.map((message) => {
        return message;
    })
    res.json(messages);
});



app.post('/channels/:id', (req, res) => {
    const channel = getChannel(req.params.id);

    channel.addMessage(req.body.user, req.body.message);
    res.json(channel.messages);
})

app.listen(PORT, () => {
    console.log("Connected on port:" + PORT);
});

