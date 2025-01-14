const { guildID, ownerBot } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const { Client, Interaction } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 * @returns
 */
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.ownerBot) {
      if (!ownerBot.includes(interaction.member.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.guildID) {
      if (!interaction.guild.id === guildID) {
        interaction.reply({
          content: `Only in [${interaction.guild.name}](https://discord.com/channels/${interaction.guild.id}) can use this commands.`,
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "You don't have the privilege to use this command!",
            ephemeral: true,
          });
          break;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have the privilege to execute this command.",
            ephemeral: true,
          });
          break;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
