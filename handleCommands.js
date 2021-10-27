const getCommands = require('./getCommands');

module.exports = async function(interaction) {
    // check the interaction
    if (interaction.user.bot) return;
    if (!interaction.isCommand()) return;
    // get the argument
    const commands = getCommands();
    // execute the command
    for (const command of commands) {
        if (interaction.commandName == command.name) {
            await interaction.reply('Brace yourself for inspiration :robot:');
            command.execute(interaction);
        }
    }
};
