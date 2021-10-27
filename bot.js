// load a new discord client and declare commands
const client = require('./initDiscord');

// message handling
const handleCommands = require('./handleCommands');
client.on('interactionCreate', handleCommands);
