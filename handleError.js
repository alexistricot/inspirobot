const config = require('./config.json');
const replyToInteraction = require('./replyToInteraction');

module.exports = function(interaction) {
    return function(error) {
        console.error(error);
        replyToInteraction(interaction, config['errorMessage']);
    };
};
