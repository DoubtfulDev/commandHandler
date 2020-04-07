module.exports = {
    name: "searchAndRequire",
    aliases: ["SaR", "findModules"],
    description: "Function to find and import all modules.",
    category: `${__dirname.split("\\")[__dirname.split("\\").length - 1].toLowerCase()}`,
    run(folderPath) {

        //Function to require all the command files
        if (!fs.existsSync(folderPath)) return console.log(`[${FileName}][ERROR][${new Date(Date.now()).toISOString().split("T")[1].split(".")[0]}] Directory "${folderPath}" does not exist.`);

        //Find all files in the folder and put them in an array
        const files = fs.readdirSync(`${folderPath}`).filter(file => file.endsWith('.js') || fs.statSync(`${folderPath}/${file}`).isDirectory());

        for (let file of files) {

            if (fs.statSync(`${folderPath}/${file}`).isDirectory()) {

                //In case the "file" is a folder, check the folder itself for more command files
                console.log(`[${FileName}][REQUIRE][${new Date(Date.now()).toISOString().split("T")[1].split(".")[0]}] FOLDER: ${folderPath}/${file}`);
                SaR.run(`${folderPath}/${file}`)

            } else {

                if (folderPath.includes("utils")) {

                    global[file.replace(".js", "")] = require(`${folderPath.replace("./lib", "..")}/${file}`);

                    if (file.replace(".js", "") == "bindDCEvents") {

                        client.login(token.token);
                        bindDCEvents.execute(client);

                    }

                } else if (folderPath.includes("Minecraft")) {

                    //Require the order file using its path
                    const order = require(`${folderPath.replace("./lib", "..")}/${file}`);

                    //Put the order export in the collection, indexed by its key
                    orders.set(order.name.toLowerCase(), order)

                } else if (folderPath.includes("Discord")) {

                    //Require the command file using its path
                    const command = require(`${folderPath.replace("./lib", "..")}/${file}`);

                    //Put the command export in the collection, indexed by its key
                    commands.set(command.name.toLowerCase(), command)

                }

                console.log(`[${FileName}][REQUIRE][${new Date(Date.now()).toISOString().split("T")[1].split(".")[0]}] FILE: ${folderPath}/${file}`);

            }
        }

    }

}