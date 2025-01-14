const { EmbedBuilder } = require("discord.js");
const GControl = require("../../../settings/models/Control.js");

module.exports = {
    name: "pause",
    description: "Pause current played song.",
    category: "Music",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const Control = await GControl.findOne({ guild: interaction.guild.id });

        // When button control "enable", this will make command unable to use. You can delete this
        if (Control.playerControl === "enable") {
            const ctrl = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | You can't use this command as the player control was enable!`);
            return interaction.editReply({ embeds: [ctrl] });
        }

        const player = client.poru.players.get(interaction.guild.id);

        if (!player.isPaused) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Song is already: \`Paused\``);

            return interaction.editReply({ embeds: [embed] });
        } else {
            await player.pause(true);

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`⏸️\` | Song has been: \`Paused\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
