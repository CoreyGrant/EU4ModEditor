import * as file from '../../shared/file/projectData';
function getPath(obj, path){
    var objCopy = obj;
    for(var p of path){
        objCopy = objCopy[p];
    }
    return objCopy;
}

onmessage = function(e){
    var {payload, context} = e.data;
    var {path, objectId, projectId, files, settings, comments, exports, images }= payload;
    if(files){
        var facade = file.files(context.appFolder);
        var filesObj = facade.get(projectId);
        getPath(filesObj, path)[objectId] = files;
        facade.set(projectId, filesObj);
    }
    if(settings){
        var facade = file.projectSettings(context.appFolder);
        var filesObj = facade.get(projectId);
        getPath(filesObj, path)[objectId] = files;
        facade.set(projectId, filesObj);
    }
    if(comments){
        var facade = file.comments(context.appFolder);
        var filesObj = facade.get(projectId);
        getPath(filesObj, path)[objectId] = files;
        facade.set(projectId, filesObj);
    }
    // if(exports){
    //     var facade = file.exports(context.appFolder);
    //     var filesObj = facade.get(projectId);
    //     getPath(filesObj, path)[objectId] = files;
    //     facade.set(projectId, filesObj);
    // }
    // if(images){
    //     var facade = file.images(context.appFolder);
    //     var filesObj = facade.get(projectId);
    //     getPath(filesObj, path)[objectId] = files;
    //     facade.set(projectId, filesObj);
    // }
    postMessage({type: "done"});
}