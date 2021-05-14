import * as Blockly from "blockly/core";

const blockName = "s4d_vol";

const blockData = {
    "message0": "%{BKY_VOL}",
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
    let args = message.content.slice().trim().split(" ");
  if(!message.member.voice.channel) return message.channel.send({embed: {color:'RED', description: 'You must be in a voice channel!' }})
    
  if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: 'RED', description: 'You are not in my voice channel!'}});
  
  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: 'RED', description: 'There is nothing playing!' }})
  let volume = parseInt(args.join(" "));
  if (!volume) return message.channel.send({embed: {color: 'RED', description: 'Please enter a number!' }})
  if (isNaN(args[0])) return message.channel.send({embed: {color: 'RED', description: 'Please enter a valid number!' }})
  
  client.player.setVolume(message.guild.id, volume);
    
 return message.channel.send({embed: {color: 'GREEN', description: 'Volume set to ' + args.join(" ")}});
    `;
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