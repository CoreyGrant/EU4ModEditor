var WebWorkerMessage = window.eu4modeditor.models.WebWorkerMessage;
var WebWorkerResponse = window.eu4modeditor.models.WebWorkerResponse;
var context = {
    appFolder: window.eu4modeditor.appFolder
}

function startAndRunWorker(name, payload, partialCallback){
    return new Promise((resolve, reject) => {
        var worker = new Worker("dist/" + name);
        worker.onerror = function(message, filename, lineno){
            reject({message, filename, lineno});
        }
        worker.onmessage = function(e){
            var {type, data} = e.data;
            if(type == "partial" && partialCallback){
                partialCallback(data);
                return;
            }
            if(type == "done"){
                resolve(data);
                worker.terminate();
            }
        }
        worker.postMessage(new WebWorkerMessage(context, payload));
    });
}

export function loadProjectList(payload, partialCallback){
    return startAndRunWorker("loadProjectList.js", payload, partialCallback);
}

export function loadProject(payload, partialCallback){
    return startAndRunWorker("loadProject.js", payload, partialCallback);
}

export function updateProjectObject(payload, partialCallback){
    return startAndRunWorker("updateProjectObject.js", payload, partialCallback);
}

export function loadSettings(payload, partialCallback){
    return startAndRunWorker("loadSettings.js", payload, partialCallback);
}

export function saveSettings(payload, partialCallback){
    return startAndRunWorker("saveSettings.js", payload, partialCallback);
}

export function importProject(payload, partialCallback){
    return startAndRunWorker("importNewProject.js", payload, partialCallback);
}

export function importBaseGame(payload, partialCallback){
    return startAndRunWorker("importBaseGame.js", payload, partialCallback);
}

export function loadBaseGame(payload, partialCallback){
    return startAndRunWorker("loadBaseGame.js", payload, partialCallback);
}

export function exportProject(payload, partialCallback){
    return startAndRunWorker("exportProject.js", payload, partialCallback);
}
