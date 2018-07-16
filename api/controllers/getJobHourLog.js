const moment = require('moment')

module.exports = function (req, res) {

    let sQuery = "SELECT * FROM workHours WHERE jobId = ?"
    let jobId = 1

    try {
        gDb.all(sQuery, jobId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetJobHourLog ' + err)
                return res.status(500)
            }
            // gLog('info', ajRows)
            let sortedDates = ajRows.sort(function(a, b){
                return moment(a.startTime).format('X')-moment(b.startTime).format('X')
            });

            for (let i = 0; i < sortedDates.length; i++) {
                sortedDates[i].order = i;
            }
            // console.log(sortedDates)
            return res.json( sortedDates );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetJobHourLog: ' + ex)
        return res.status(500)
    }

}