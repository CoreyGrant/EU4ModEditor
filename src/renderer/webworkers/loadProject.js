import {files, projectSettings, comments, exports, images} from '../../shared/file/projectData';
onmessage = function(e){
    var {payload, context} = e.data;
    var {id} = payload;
    
    // base game will be loaded either as it is imported,
    // or as part of the opening bundle

    var project = {
        files: files(context.appFolder).get(id),
        projectSettings: projectSettings(context.appFolder).get(id),
        comments: comments(context.appFolder).get(id),
        exports: exports(context.appFolder).get(id),
        images: images(context.appFolder).get(id),
        id
    };
    postMessage({type: "done", data: project});
}