module.exports = {
    name: 'quote',
    description: 'Sends an inspirational quote.',
    execute: quote,
};

const config = require('../config.json');
const getQuote = require('../getQuote');
const handleError = require('../handleError');
const replyToInteraction = require('../replyToInteraction');
const Discord = require('discord.js');

function quote(interaction) {
    console.log(`Request from ${interaction.user.username}`);
    getQuote(interaction, getQuoteCallBackFunction(interaction));
}

function getQuoteCallBackFunction(interaction) {
    return (response) => {
        console.log('Got a response from inspirobot');
        const { statusCode } = response;
        if (statusCode !== 200) {
            handleError(interaction, response);
            return;
        }
        const contentType = response.headers['content-type'];
        console.log(`content type: ${contentType}`);
        response.on('data', (d) => {
            console.log(`data: ${d}`);
            const embed = new Discord.MessageEmbed()
                .setTitle(config['title'])
                .setColor(parseInt(config['color']))
                .setImage('' + d);
            replyToInteraction(interaction, {
                embeds: [embed],
            });
        });
    };
}
