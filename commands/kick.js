const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user from the server",
  async execute(message, args) {
    // Permission check
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      return message.reply("You don't have permission to kick members");
    }
    // Validate arguments
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Please mention a user to kick");
    }
    // Safety check
    if (member.id === message.author.id) {
      return message.reply("You cannot kick yourself");
    }
    // Check if the target is kickable by the bot (Hierarchy check)
    if (!member.kickable) {
      return message.reply(
        "I cannot kick this user. They might have a higher role than me or be the server owner."
      );
    }
    //Excution
    try {
      await member.kick();
      message.channel.send(
        `**${member.user.tag}** has been kicked from the server.`
      );
    } catch (error) {
      console.error(error);
      message.reply("Failed to kick the user");
    }
  },
};
