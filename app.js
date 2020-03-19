'user strict';

const User = {
    firstName: 'John',
    secondName: 'Watson',
    birthday: 1994 - 05 - 31
}

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

const users = [];

// add user
app.post('/users', (req, res, next) => {
    const user = req.body;
    user.birthday = new Date(user.birthday);
    user.id = Date.now();

    users.push(user);
    res.json(user);
});

// get all users
app.get('/users', (req, res, next) => {
    res.json(users);
});

// get single user
app.get('/users/:id', (req, res, next) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.json(user);
});

// update a user
app.put('/users/:id', (req, res, next) => {
    let user = req.body;
    user.birthday = new Date(user.birthday);
    delete user.id;
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    res.json(users[index]);
});

// delete a user
app.delete('/users/:id', (req, res, next) => {
    const user = req.body;
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    users.splice(index, 1);
    res.sendStatus(200);
})


app.listen(3000, err => {
    if (err) {
        console.err(err);
        return;
    }

    console.log('App listening on port 30000');
});