var express = require('express')
var app = express()
var chalk = require('chalk')
global.gFs = require('fs')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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

var work = require('./controllers/work.js')

app.get('/jobs', (req, res) => {
    work.getCurrentPeriod((err, jStatus, jWorkData) => {
        if (err) {
            gLog('err', jStatus)
            return res.json(jStatus)
        }
        gLog(jStatus)
        return res.json(jWorkData)
    })
})

app.listen(3001, err => {
    if (err) {
        gLog('err', 'Cannot use port 3001')
        return
    }
    gLog('ok', 'Listening on port 3001')
})