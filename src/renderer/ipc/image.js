const { ipcRenderer } = require('electron');
const { getName } = require('../../utilities/ipcNameHelper');

function loadImage(id, name, format, callback){
    var ipcName = getName('image', 'loadImage');
    
    ipcRenderer.once(ipcName.reply, (event, arg) => {
        callback(arg);
    });
    ipcRenderer.send(ipcName.name, {id, name, format});
}

export {
    loadImage
}