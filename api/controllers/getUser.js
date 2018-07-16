module.exports = function (req, res) {

    let sQuery = "SELECT * FROM users WHERE userId = ?"
    let userId = 1

    try {
        gDb.all(sQuery, userId, function (err, ajRows) {
            if (err) {
                gLog('err', 'ERROR in GetUser ' + err)
                return res.status(500)
            }
            gLog('info', ajRows)
            ajRows[0].remove(password)
            return res.json(ajRows);

        })
    } catch (ex) {
        gLog('ex', 'EXCEPTION in GetUser: ' + ex)
        return res.status(500)
    }

}