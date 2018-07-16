const moment = require('moment')

module.exports = function (req, res) {

    let sQuery = "SELECT * FROM payPeriods WHERE jobId = ?"
    let jobId = 1

    try {
        gDb.all(sQuery, jobId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUserJobs ' + err)
                return res.status(500)
            }
            // gLog('info', ajRows)
            
            let sortedDates = ajRows.sort(function(a, b){
                return moment(b.startDate).format('X')-moment(a.startDate).format('X')
            });

            for (let i = 0; i < sortedDates.length; i++) {
                sortedDates[i].order = i;
            }
            // console.log(sortedDates)

            return res.json( ajRows );

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUserJobs: ' + ex)
        return res.status(500)
    }

}