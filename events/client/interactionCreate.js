module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
        
            const command = client.slash.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'an Error check console' });
            
            if (command.ownerOnly) {
                if (interaction.user.id !== client.config.ownerID) {
                    return interaction.reply({ content: "This command only for Bot Owner!", ephemeral: true });
                }
            }
            
            const args = [];
            
            for (let option of interaction.options.data) {
                if (option.type === 'SUB_COMMAND') {
                    if (option.name) args.push(option.name);
                    option.options?.forEach(x => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
            
            try {
                command.run(client, interaction, args)
            } catch (e) {
                interaction.reply({ content: e.message });
            }
        }

        const supportRow = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageButton()
                .setCustomId('explain')
                .setLabel('Explicar problema')
                .setEmoji('✅')
                .setStyle('SUCCESS')
        ) 
        if (interaction.isSelectMenu()) {
            //if (interaction.values[0] === 'Support') {
                ticketcat = interaction.values[0]
                
                const supportEmbed = new client.discord.MessageEmbed()
                    .setTitle(`**${ticketcat}**`)
                    .setDescription('Explica tu problema')
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                await interaction.update({ embeds: [supportEmbed], components: [supportRow] });
            //}
        }
        if (interaction.isButton()) {
            if (interaction.customId === 'explain') {
                const ticket = new client.discord.Modal()
                .setCustomId('myModal')
                .setTitle('Real Project | Sistema de Soporte');
                const explainInput = new client.discord.TextInputComponent()
                    .setCustomId('explain')
                    .setLabel("Explica tu problema")
                    // Paragraph means multiple lines of text.
                    .setStyle('PARAGRAPH');
                // An action row only holds one text input,
                // so you need one action row per text input.
                const secondActionRow = new client.discord.MessageActionRow().addComponents(explainInput);
                // Add inputs to the modal
                ticket.addComponents(secondActionRow);
                // Show the modal to the user
                await interaction.showModal(ticket);
                return;
            }
        }
        if (interaction.isModalSubmit()) {
            
            // Get the data entered by the user
            explain = interaction.fields.getTextInputValue('explain');
            console.log(explain);

            await interaction.guild.channels.create(`Ticket-${interaction.user.id}`, {
                type: 'text',
            }).then(channel => {
                channelid = channel.id
                const ticketEmbed = new client.discord.MessageEmbed()
                    .setTitle(`**Sistema de Soporte**`)
                    .addField('Categoría', ticketcat)
                    .addField('Explicación', explain)
                    .addField('Dueño', `<@${interaction.user.id}>`)
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });
                const ticketc = channel.send({ embeds: [ticketEmbed] })
                url = ticketc.url
                console.log(url)

                channel.permissionOverwrites.edit(interaction.guild.id, {
                    VIEW_CHANNEL: false
                })
                channel.permissionOverwrites.edit(interaction.user.id, {
                    VIEW_CHANNEL: true
                })
            });
            const ticketcEmbed = new client.discord.MessageEmbed()
            .setTitle('**Sistema de Soporte**')
            .setDescription('Ticket creado')
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });
            const supportRow = new client.discord.MessageActionRow()
            /*
            .addComponents(
                new client.discord.MessageButton()
                    .setLabel("Go to ticket")
                    .setStyle("PRIMARY")
                    .setURL(url),
            )*/
            await interaction.update({embeds: [ticketcEmbed], components: [supportRow]});

        }
        return;
    }
    
}
