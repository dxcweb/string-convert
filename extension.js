const {
    window: {
        activeTextEditor: editor
    },
    commands: {
        registerCommand
    }
} = require('vscode')
const string = require("underscore.string");

function isCapitalCase(word) {
    return /^([A-Z]+[a-z]*)+[1-9]*/.test(word);
  }
  
  function isSnakeCase(word) {
    return /^([a-z]+_[a-z]+)+[1-9]*/.test(word);
  }
  
  function isDashCase(word) {
    return /^([a-z]+-[a-z]+)+[1-9]*/.test(word);
  }
  
  function isCamelCase(word) {
    return /^[a-z]+([A-Z]+[a-z]*)+[1-9]*/.test(word);
  }

exports.activate = () => {
    registerCommand('extension.stringConvert', () => {
        editor.edit(builder => {
            editor.selections.forEach(selection => {
                let text = editor.document.getText(selection);
                if (isCapitalCase(text)) {
                    text = string.underscored(text);
                  } else if (isSnakeCase(text)) {
                    text = string.camelize(text, true);
                  } else if (isCamelCase(text)) {
                    text = string.dasherize(text);
                  } else if (isDashCase(text)) {
                    text = string.camelize(text);
                    text = string.capitalize(text);
                  }
                builder.replace(selection, text);
            });
        });
    });
};

exports.deactivate = () => {

};