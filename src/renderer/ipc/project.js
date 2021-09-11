const { ipcRenderer } = require('electron');
const { getName } = require('../../utilities/ipcNameHelper');

function loadProject(name, callback){
    var ipcName = getName('project', 'loadProject');
    
    ipcRenderer.once(ipcName.reply, (event, arg) => {
        callback(JSON.parse(arg));
    });
    ipcRenderer.send(ipcName.name, name);
}

function saveProject(project, callback){
    var ipcName = getName('project', 'saveProject');

    ipcRenderer.once(ipcName.reply, (event, arg) => {callback(JSON.parse(arg))});
    ipcRenderer.send(ipcName.name, project);
}

function importProject(importRequest, callback){
    var ipcName = getName('project', 'importProject');

    ipcRenderer.once(ipcName.reply, (event, arg) => {callback(JSON.parse(arg))});
    ipcRenderer.send(ipcName.name, importRequest);
}

function getProjectSummaries(callback){
    var ipcName = getName('project', 'getProjectSummaries');
    ipcRenderer.once(ipcName.reply, (event, arg)=> callback(arg));
    ipcRenderer.send(ipcName.name);
}

export {
    loadProject,
    importProject,
    getProjectSummaries,
    saveProject
}