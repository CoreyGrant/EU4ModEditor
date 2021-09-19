import {files, projectSettings, comments, exports, images} from '../../shared/file/projectData';
import {Project} from '../store/app/models.js';

onmessage = function(e){
    var {payload, context} = e.data;
    var {id} = payload;
    
    // base game will be loaded either as it is imported,
    // or as part of the opening bundle
    var project = new Project(
        files(context.appFolder).get(id),
        comments(context.appFolder).get(id),
        images(context.appFolder).get(id),
        exports(context.appFolder).get(id),
        projectSettings(context.appFolder).get(id));

    postMessage({type: "done", data: project});
}