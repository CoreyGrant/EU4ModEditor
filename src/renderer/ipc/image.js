const { ipcRenderer } = require('electron');
const { getName } = require('../../utilities/ipcNameHelper');

const imageCache = {};
function loadImage(id, projectName, callback){
    var image = imageCache[id];
    if(image){
        callback(image);
        return;
    }
    var ipcName = getName('image', 'loadImage');
    
    ipcRenderer.once(ipcName.reply, (event, arg) => {
        imageCache[id] = arg;
        callback(arg);
    });
    ipcRenderer.send(ipcName.name, [id, projectName]);
}

export {
    loadImage
}