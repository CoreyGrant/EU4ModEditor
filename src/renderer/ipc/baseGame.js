const { ipcRenderer } = require('electron');
const { getName } = require('../../utilities/ipcNameHelper');

function loadBaseGame(callback){
    var ipcName = getName('baseGame', 'loadBaseGame');
    
    ipcRenderer.once(ipcName.reply, (event, arg) => {
        callback(JSON.parse(arg));
    });
    ipcRenderer.send(ipcName.name);
}
function importBaseGame(importRequest, callback){
    var ipcName = getName('baseGame', 'importBaseGame');

    ipcRenderer.once(ipcName.reply, (event, arg) => {callback(JSON.parse(arg))});
    ipcRenderer.send(ipcName.name, importRequest);
}
export {
    loadBaseGame,
    importBaseGame
}