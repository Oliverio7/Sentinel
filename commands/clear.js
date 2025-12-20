const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  // 1. Definition
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deletes a specified number of messages (Max 100).")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    // Only allow users with "Manage Messages" permission to see/use this command
    // PermissionFlagsBits is the standard for Slash Commands
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  // 2. Execution
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    try {
      // bulkDelete(amount, filterOld) - true filters messages older than 14 days
      await interaction.channel.bulkDelete(amount, true);

      // Ephemeral response (only visible to the user) keeps the chat clean
      await interaction.reply({
        content: `🧹 Successfully deleted **${amount}** messages.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to prune messages in this channel.",
        ephemeral: true,
      });
    }
  },
};
