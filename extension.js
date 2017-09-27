const {
    window: {
        activeTextEditor: editor
    },
    commands: {
        registerCommand
    }
} = require('vscode')
const string = require("underscore.string");

exports.activate = () => {
    registerCommand('extension.stringConvert', () => {
        editor.edit(builder => {
            editor.selections.forEach(selection => {
                let text = editor.document.getText(selection);
                if (/^[A-Z]/.test(text)) {
                    text = string.underscored(text);
                } else if (/_/.test(text)) {
                    text = string.camelize(text, true);
                } else if (/[A-Z]/.test(text)) {
                    text = string.dasherize(text);
                } else if (/-/.test(text)){
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