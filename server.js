const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const chalk = require('chalk')
const bodyParser = require('body-parser')
global.gFs = require('fs')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


global.gDb = new sqlite.Database(__dirname + '/db.db')
global.gLog = (sStatus, sMessage) => {

    switch (sStatus) {
        case 'ok':
            console.log(chalk.green(sMessage))
            break
        case 'err':
            console.log(chalk.red(sMessage))
            break
        case 'ex':
            console.log(chalk.magenta(sMessage))
            break
        case 'info':
            console.log(sMessage)
            break
    }
}

// Use BodyParser
app.use(bodyParser.json({limit: '50mb'}))

// API routes
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

app.listen(3001, err => {
    if (err) {
        gLog('err', 'Cannot use port 3001')
        return
    }
    gLog('ok', 'Listening on port 3001')
})