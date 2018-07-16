const moment = require('moment')

module.exports = function (req, res) {
    const hourLogId = req.params.id

    const sQuery = "DELETE FROM workHours WHERE id = ?"

    try {
        gDb.run(sQuery, hourLogId, function (err) {
            if (err) {
                gLog('err', 'ERROR in DeleteHourLog ' + err)
                return res.status(500)
            }
            console.log(this)
            // Here we need to return the Deleted object id to the client
            return res.json( {id: Number(hourLogId)} );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in DeleteHourLog: ' + ex)
        return res.status(500)
    }

}