const { PermissionsBitField } = require("discord.js");
module.exports = {
  name: "clear",
  description: "Clears a specified number of messages.",
  async execute(message, args) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
      return message.reply("You don't have permissions to delete messages!");
    }

    if (args.length === 0) {
      return message.reply(
        "Please specify how many messages to clear. Example: `!clear 5`"
      );
    }

    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply("That doesn't look like a number");
    } else if (amount < 1 || amount > 100) {
      return message.reply("Please provide a number between 1 and 100");
    }

    try {
      const deletedMessages = await message.channel.bulkDelete(amount);
      const confirmationMsg = await message.channel.send(
        `Successfully deleted **${deletedMessages.size}** messages.`
      );
      setTimeout(() => {
        confirmationMsg.delete().catch(() => {});
      }, 3000);
    } catch (error) {
      console.error(error);
      return message.reply("There was an error trying to prune messages.");
    }
  },
};
