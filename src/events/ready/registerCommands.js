const { guildID } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
var clc = require("cli-color");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, guildID);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name == name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(clc.bold(`Deleted command "${name}".`));
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(clc.bold(`Edited command "${name}".`));
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            clc.bold(
              `Skipping registering command "${name}" as it's set to delete.`
            )
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(clc.bold(`Registered command "${name}".`));
      }
    }
  } catch (error) {
    console.log(`There was an error while register command: ${error}`);
  }
};
