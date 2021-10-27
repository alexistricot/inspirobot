const config = require('./config.json');
const getCommands = require('./getCommands');
const {
    SlashCommandBuilder,
    SlashCommandStringOption,
    SlashCommandIntegerOption,
} = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

function buildCommandDeclaration(command) {
    const declaration = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description);
    if (command.intOption) {
        declaration.addIntegerOption(buildIntOption(command.intOption));
    }
    if (command.strOption) {
        declaration.addIntegerOption(buildStringOption(command.strOption));
    }
    return declaration;
}

function buildIntOption(intOption) {
    return new SlashCommandIntegerOption()
        .setName(intOption.name)
        .setDescription(intOption.description)
        .setRequired(intOption.required);
}

function buildStringOption(strOption) {
    return new SlashCommandStringOption()
        .setName(strOption.name)
        .setDescription(strOption.description)
        .setRequired(strOption.required);
}

function postCommands(commandDeclarations) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationGuildCommands(config['clientID'], config['guild']), {
        body: commandDeclarations,
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

// main function
module.exports = function() {
    const commandDeclarations = getCommands()
        .map((command) => buildCommandDeclaration(command))
        .map((command) => command.toJSON());
    postCommands(commandDeclarations);
};
