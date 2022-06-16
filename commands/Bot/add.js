// Example of how to make a SlashCommand

module.exports = {
    name: "add",
    category: "Bot",
    description: "Add a person to the ticket!",
    ownerOnly: false,
    run: async (client, interaction) => {
        const chan = client.channels.cache.get(interaction.channelId);
        
    },
};
