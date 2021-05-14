import * as Blockly from "blockly/core";

const blockName = "s4d_play";

const blockData = {
    "message0": "%{BKY_PLAY}",
    "args0": [
    ],
    "colour": "#4C97FF",
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};
Blockly.JavaScript[blockName] = function(){
    const code = `
    var message = s4dmessage
    let args = message.content.slice(config.prefix.length).trim().split(" ");
    if (!message.member.voice.channel) return message.channel.send({embed: {color: 'RED', description: 'You must be in a voice channel to play!'}});
  
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: 'RED', description: 'You are not in my voice channel!'}});
    
    let query = args.join(" ");
    if (!query) return message.channel.send({embed: {color: 'RED', description: 'Please enter a query to search!' }})
    
    const searchTracks = await client.player.searchTracks(query).catch(e => {
      return message.channel.send({embed: {color: 'RED', description:'No results found!'}})
    });
    
    if(searchTracks.length < 1) return message.channel.send({embed: {color: 'RED', description: 'No results found!'}})
      
    let track = searchTracks[0];
    
    
    if(client.player.isPlaying(message.guild.id)){
        // Add the song to the queue
        let song = await client.player.addToQueue(message.guild.id, track, message.member.user.tag);
       return message.channel.send({embed: {color: 'GREEN', description: song.name + ' by ' + song.author + '  Added to the queue!' }})
    } else {
        // Else, play the song
        let song = await client.player.play(message.member.voice.channel, track, message.member.user.tag);
        message.channel.send({embed: {color: 'GREEN', description: ' Now Playing:\n ' + song.name }})
        client.player.getQueue(message.guild.id).on('end', () => {
        message.channel.send({embed: {color: 'RED', description: 'Queue completed, add some more songs to play!' }})
        });

        client.player.getQueue(message.guild.id).on('trackChanged', (oldSong, newSong, skipped, repeatMode) => {
            if(repeatMode){
                message.channel.send({embed: {color: 'GREEN', description: 'Repeating:\n ' + oldSong.name })
            } else {
                message.channel.send({embed: {color: 'GREEN', description: 'Now Playing:\n'+ newSong.name }})
            }
        });
    }\n`;
    return code;
};

import { registerRestrictions } from "../../restrictions";
registerRestrictions(blockName, [
    {
        type: "toplevelparent",
        message: "RES_MUST_BE_IN_ON_MESSAGE",
        types: [
            "s4d_on_message"
        ]
    }
]);
