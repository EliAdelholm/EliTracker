module.exports = function (req, res) {

    let sQuery = "SELECT * FROM jobs WHERE userId = ?"
    let userId = 1

    try {
        gDb.all(sQuery, userId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUserJobs ' + err)
                return res.json({ 'status': 'error' })
            }
            // gLog('info', ajRows)
            return res.json(ajRows);

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUserJobs: ' + ex)
        return res.json({ 'status': 'error' })
    }

}