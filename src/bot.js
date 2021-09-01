require('dotenv').config();

const {Client} = require('discord.js');

const client = new Client();
const PREFIX = 'vot';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'invite') {
      let channel = message.channel;
      channel.createInvite({unique: true}).then((invite) => {
        message.reply(
          "Hey! I've created you an invite: https://discord.gg/" + invite.code
        );
      });
    }
    if (CMD_NAME === 'hello') {
      message.reply('tmkc');
    }

    if (CMD_NAME === 'kick') {
      if (args.length === 0)
        return message.reply('pls tag the user you want to kick');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(member, 'ko kick kr dia '))
          .catch((err) => message.channel.send(err));
      } else {
        message.channel.send('user not found');
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
