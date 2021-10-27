const fs = require('fs');

module.exports = function getCommands() {
    const commandFiles = fs.readdirSync('./commands');
    return commandFiles.map((f) => require('./commands/' + f));
};
