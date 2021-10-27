const https = require('https');
const config = require('./config.json');
const handleError = require('./handleError');

module.exports = function getQuote(interaction, callback) {
    const req = config['url'] + 'api?generate=true';
    https.get(req, callback).on('error', handleError(interaction));
};
