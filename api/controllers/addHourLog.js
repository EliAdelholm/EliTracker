const moment = require('moment')

module.exports = function (req, res) {
    const data = req.body;
    data.hours = moment(data.endTime).diff(moment(data.startTime), 'hours', true)

    data.startTime = moment(data.startTime).format('YYYY-MM-DD HH:mm:ss')
    data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss')
    data.periodId = Number(data.periodId)

    const sQuery = "INSERT INTO workHours VALUES( ?, ?, ?, ?, ?, ?, ? )"
    const aData = [null, data.periodId, data.startTime, data.endTime, data.hours, data.logged, data.jobId]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in AddHourLog ' + err)
                return res.status(500)
            }
            console.log(this.lastID)
            data.id = this.lastID
            // Here we need to get the last insertd id, create the object and send it to the client
            return res.json( data );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in AddHourLog: ' + ex)
        return res.status(500)
    }

}