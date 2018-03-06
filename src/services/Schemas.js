import { normalize, schema } from 'normalizr';

const job = new schema.Entity('jobs', {}, {idAttribute: 'id'});

export default {
    job,

    normalize,
    schema
} 