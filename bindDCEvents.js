module.exports = {
    name: "bindDCEvents",
    aliases: ["DCeventBinder", "connectDCEvents"],
    description: "Function to bind the event listeners to the client.",
    category: `${__dirname.split("\\")[__dirname.split("\\").length - 1].toLowerCase()}`,
    execute(client) {

        client.on('message', msg => {

            if (!msg.guild) return;
            if (!msg.guild.roles.cache.find(r => r.name == "Alt Manager")) return;
            if (!msg.member.roles.cache.has(msg.guild.roles.cache.find(r => r.name == "Alt Manager").id)) return;

            commandHandler.execute(msg);
        
        })

        client.on('ready', () => {

            console.log(`

            ////////////////////////////////////////
            //                                    //
            //       Discord bot logged in.       //
            //  Now dynamically logging in alts.  //
            //                                    //
            ////////////////////////////////////////
    
            `)

            altLoader.run();

        })

    }

}