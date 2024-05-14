const { Events, PermissionsBitField } = require('discord.js');
const { syncDatabase, MediaChannels } = require('../database.js');
const DEBUG = true;

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        DEBUG && console.log(`Ready! Logged in as ${client.user.tag}`);
        try {
            await syncDatabase();
            DEBUG && console.log('Database sync complete.');
        } catch (error) {
            console.error('Error during startup:', error);
        }
    },
};
