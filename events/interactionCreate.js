const { Events } = require('discord.js');
const DEBUG = false;

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        DEBUG && console.log(interaction);
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            try {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    }).catch(followUpError => {
                        console.error('Error following up on interaction:', followUpError);
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    }).catch(replyError => {
                        console.error('Error replying to interaction:', replyError);
                    });
                }
            } catch (secondaryError) {
                console.error('Error handling interaction error:', secondaryError);
            }
        }
    },
};
