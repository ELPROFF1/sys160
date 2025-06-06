const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
 if(!cmd)       return interaction.reply({
        content: `> **An Error Occured**`,
         ephemeral: true})

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);

    }
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});

client.once("ready", () => {
    console.log("By Elproff");
});

client.setMaxListeners(1000000);

client.on("ready", () => {
    client.user.setPresence({
        status: "dnd",
        activities: [{
            name: "pharaohs",
            type: "STREAMING",
            url: "https://discord.gg/pharaohs"
        }]
    });
});