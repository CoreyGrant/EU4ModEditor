const { ipcRenderer } = require('electron');
const { getName } = require('../../utilities/ipcNameHelper');

function loadOptions(callback){
    var ipcName = getName('options', 'loadOptions');
    
    ipcRenderer.once(ipcName.reply, (event, arg) => {
        callback(JSON.parse(arg));
    });
    ipcRenderer.send(ipcName.name, name);
}


function saveOptions(options, callback){
    var ipcName = getName('options', 'saveOptions');

    ipcRenderer.once(ipcName.reply, (event, arg) => {callback()});
    ipcRenderer.send(ipcName.name, options);
}

export {
    loadOptions,
    saveOptions
}