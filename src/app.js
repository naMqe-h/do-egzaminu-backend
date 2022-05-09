require('dotenv').config()
const express = require('express')
const db = require('./db/config')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next()
})

app.get('/getQuestion', (req, res) => {
    const { count } = req.query
    let sqlGetQuestions = `SELECT * FROM questions WHERE 1 LIKE 0`
    
    for(let i = 0; i < count; i++) {
        const number = Math.floor(Math.random() * 3256)
        sqlGetQuestions += ` OR id LIKE ${number}`
    }
    
    db.query(sqlGetQuestions, (err, result) => {
        if(err) throw err
        res.json(result)
    })
    
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})