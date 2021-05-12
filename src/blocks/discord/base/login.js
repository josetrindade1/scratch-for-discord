import * as Blockly from "blockly/core";

const blockName = "s4d_login";

const blockData = {
    "type": "block_type",
    "message0": "%{BKY_LOGIN}",
    "args0": [
        {
            "type": "input_value",
            "name": "TOKEN",
            "check": "String"
        }
    ],
    "colour": "#F46580",
    "tooltip": "%{BKY_LOGIN_TOOLTIP}",
    "helpUrl": ""
};

Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};

Blockly.JavaScript[blockName] = function(block) {
    const value = Blockly.JavaScript.valueToCode(block, "TOKEN", Blockly.JavaScript.ORDER_ATOMIC);
<<<<<<< HEAD
    const code = `s4d.client.login(${value}).catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });\n`;
=======
    const code = `s4d.client.login(${value}).catch((e) => s4d.tokenInvalid = true);\n`;
>>>>>>> f48a4cb39a4f5a90216969c9186068d7ca6e9680
    return code;
};
