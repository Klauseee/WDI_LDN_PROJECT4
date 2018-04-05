const env = process.env.NODE_ENV || 'dev'; //tells us what environment we are in (production, dev or test)
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/Jobbly${env}`;
const secret = process.env.SECRET || '5u1l0v3551mba';

module.exports = { env, port, dbURI, secret };
