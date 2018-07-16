/* DEPENDENCIES */
const express = require('express');
const router = express.Router();

/* CONTROLLERS */
const work = require('./controllers/work.js')
const getUser = require('./controllers/getUser.js')
const getUserJobs = require('./controllers/getUserJobs.js')
const getJobPeriods = require('./controllers/getJobPeriods.js')
const getJobHourLog = require('./controllers/getJobHourLog.js')
const addHourLog = require('./controllers/addHourLog.js')
const updateHourLog = require('./controllers/updateHourLog.js')
const deleteHourLog = require('./controllers/deleteHourLog.js')

/* ROUTES */
router.get('/jobs', (req, res) => {
    getUserJobs(req, res)
})

router.get('/user', (req, res) => {
    getUser(req, res)
})

router.get('/user-jobs', (req, res) => {
    getUserJobs(req, res)
})

router.get('/job-periods', (req,res) => {
    getJobPeriods(req, res)
})

/* HOUR LOG ROUTES */
router.get('/job-hour-logs', (req, res) => {
    getJobHourLog(req, res)
})

router.post('/hour-log', (req, res) => {
    addHourLog(req, res)
})

router.put('/hour-log', (req, res) => {
    updateHourLog(req, res)
})

router.get('/hour-log/:id', (req, res) => {
    deleteHourLog(req, res)
})

module.exports = router