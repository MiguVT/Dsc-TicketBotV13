// Example of how to make a SlashCommand

module.exports = {
    name: "ticket",
    category: "Bot",
    description: "Make a ticket!",
    ownerOnly: false,
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🎟️ Loading...`);

        let channel = message.guild.channels.cache.some(c => c.name === `ticket-${message.author.id}`);
        console.log(channel)
        if (channel) {
            const pingEmbed = new client.discord.MessageEmbed()
            .setTitle('**Sistema de Soporte**')
            .setDescription('Ya tienes un ticket!')
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });
            

            await message.reply({ embeds: [pingEmbed], components: [] });
            msg.delete()
            return;
        }

        const row = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Support',
                        description: 'Selecciona esto si quieres recibir soporte.',
                        value: 'Support',
                        emoji: '🛠️',
                    },
                    {
                        label: 'Payment',
                        description: 'Selecciona esto si quieres tienes un problema con algun pago.',
                        value: 'Payment',
                        emoji: '💰',
                    },
                    {
                        label: 'In-game bugs',
                        description: 'Selecciona esto si tienes algun problema con algun bug en el juego.',
                        value: 'Ingame',
                        emoji: '🐛',
                    },
                    {
                        label: 'Hackers report',
                        description: 'Selecciona esto si quieres recibir soporte por algun problema con algun hacker.',
                        value: 'Hackers',
                        emoji: '🧨',
                    },
                    
                ]),
        )

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle('🎟️**Tickets**🎟️')
            .setDescription('Select category')
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await message.reply({ embeds: [pingEmbed], components: [row] });

        msg.delete();

        // Dropdown
    },
};
