var clc = require("cli-color");

module.exports = (client) => {
  console.log(clc.underline(`${client.user.tag} is online!`));
};
