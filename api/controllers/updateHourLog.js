const moment = require('moment')

module.exports = function (req, res) {
    const data = req.body;
    console.log(data)
    const calculatedHours = moment(data.endTime).diff(moment(data.startTime), 'hours', true)

    const sQuery = "UPDATE workHours SET (startTime, endTime, hours, logged) = ( ?, ?, ?, ? ) WHERE id = ?"
    const aData = [data.startTime, data.endTime, calculatedHours, data.logged, data.id]

    try {
        gDb.run(sQuery, aData, function (err) {
            if (err) {
                gLog('err', 'ERROR in UpdateHourLog ' + err)
                return res.status(500)
            }
            console.log(this)
            // Here we need to return the updated object to the client
            return res.json( {status: 'OK'} );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in UpdateHourLog: ' + ex)
        return res.status(500)
    }

}