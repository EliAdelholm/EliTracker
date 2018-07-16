import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users', {}, {idAttribute: 'id'})
const job = new schema.Entity('jobs', {}, {idAttribute: 'id'})
const payPeriod = new schema.Entity('payPeriods', {}, {idAttribute: 'order'})
const hourLog = new schema.Entity('hourLogs', {}, {idAttribute: 'id'});

export default {
    user,
    job,
    payPeriod,
    hourLog,

    normalize,
    schema
} 