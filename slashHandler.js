const { Client, GatewayIntentBits, Routes, Collection } = require('discord.js');
const fs = require('fs');
const scommands = [];
const scommandFiles = fs.readdirSync('./Ravgar-SlashCommand').filter(file => file.endsWith('.js'));
client.scommands = new Collection();

for (const sfile of scommandFiles) {
    const scommand = require(`../Ravgar-SlashCommand/${sfile}`);
    scommands.push(scommand.data.toJSON());
    client.scommands.set(scommand.data.name, scommand);

}
fs.readdir(`././Ravgar-SlashCommand`, (err, files) => {
    if (err) console.error(err);
    files.forEach(fse => {
        fs.readdir(`././Ravgar-SlashCommand/${fse}/`, (err, filess) => {
            filess.forEach(fsss => {
                const scommand = require(`../Ravgar-SlashCommand/${fse}/${fsss}`);
                scommands.push(scommand.data.toJSON());
                client.scommands.set(scommand.data.name, scommand);
            });
        });
    });
});

module.exports = {
    client: client,
    scommands : scommands
};