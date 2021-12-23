const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'sandy',
        database: 'todo_database'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('running successfully')
})

app.post('/signin', (req, res) => {
    const { email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if(isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Wrong Credential')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentialsss'))
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
        hash: hash,
        email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where ({
        user_id: id
    })
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }  
    })
    .catch(err => res.status(400).json('Error! Not getting'))
})

app.post('/todo', (req, res) => {
    const {id, task, userId} = req.body;
    db.transaction(trx => {
        trx.insert({
            task_id: id,
            task: task,
            user_id: userId
        })
        .into('todo')
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to add task'))
})

app.get('/todo/:id', (req,res) => {
    const {id} = req.params
    db.select('*').from('todo').where({
        user_id: id
    }).orderBy('table_id', 'asc')
    .then(todo => {
        res.json(todo)
    })
    .catch(err => res.status(400).json('no task found'))
})

app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    db('todo').where({
        task_id: id
    }).update({
        task: task
    })
    .catch(err => res.status(400).json('cannot edit the task'))
})

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    db('todo').del().where({
        task_id: id
    })
    .catch(err => res.status(400).json('cannot delete'))
})

app.listen(3001, () => {
    console.log('app is running')
})