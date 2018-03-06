var fs = require('fs')
var work = {}

work.getCurrentPeriod = (fCallback) => {
    try {
        fs.readFile(__dirname + '/workData.json', 'utf8', (err, sjWorkData) => {
            if (err) {
                var jError = { "status": "error", "message": "ERROR -> work.js -> 001" }
                gLog('err', err)
                return fCallback(true, jError, jWorkData)
            }
            var jOk = { "status": "ok", "message": "OK -> work.js -> 000" }
            let jWorkData = JSON.parse(sjWorkData);
            return fCallback(false, jOk, jWorkData)
        })
    } catch (ex) {
        gLog(ex, "get work data failed")
    }
}

module.exports = work