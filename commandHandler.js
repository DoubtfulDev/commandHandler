module.exports = {
    name: "commandHandler",
    aliases: ["functionHandler", "commHandler"],
    description: "Takes care of executing the Discord commands.",
    category: `${__dirname.split("\\")[__dirname.split("\\").length - 1].toLowerCase()}`,
    execute(msg) {

        // //Log the chat stream to console
        // log(`${msg.author.username}: ${msg.content}`, FileName, "CHAT")

        //Couple of conditional statements to filter out unwanted messages
        if (!msg.content.startsWith(prefix) || msg.author == client.user) return;

        //Filter out the arguments from the rest of the message
        let cmd = msg.content.split(/\s+/g)[0].toLowerCase().slice(prefix.length);
        let args = msg.content.split(/\s+/g).slice(1);

        //Dynamic command function executing
        let command = commands.get(cmd) || commands.find(comm => comm.aliases && comm.aliases.includes(cmd));

        if (!command) return;
        if (command.guildOnly && !msg.guild) {

            let embed = simpleEmbed.create("Oops!", "This command is guild-only, meaning you can't use it here!");
            return msg.channel.send({ embed: embed });

        }

        //Check for a lack of arguments
        if (command.hasArguments == true && args.length < command.argCount) {

            let text = `You didn't provide enough arguments for this command, ${msg.author}! (${args.length}/${command.argCount})`;

            if (command.usage) {

                text += `\nThe proper usage for this command would be: \`\`${prefix}${command.name} ${command.usage}\`\``;

            }

            let embed = simpleEmbed.create(`Oops!`, text, embedColors.warning);
            return msg.channel.send({ embed: embed});
        } 

        //Try to execute, if that isn't possible something went wrong. Log that.
        try { 

            command.execute(msg, args);
            msg.delete();

        } catch(e) {

            logify.log(e, "commandHandler.js", "ERROR");
            let embed = simpleEmbed.create(`Oops!"`, `Something went wrong while executing the \`\`${cmd}\`\` command! \n\`\`${e}\`\``, embedColors.error);
            msg.channel.send({ embed: embed });

        }

    }
}