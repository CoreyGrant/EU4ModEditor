import {projectList} from '../../shared/file/appData';
import { v4 as guid } from 'uuid';
import {deserializeProject} from '../../shared/parser/projectSerializer';
import {join} from 'path';

import {initFolder, comments, projectSettings, files, exports, images, importImages} from '../../shared/file/projectData';


onmessage = function(e){
    var message = e.data;
    var {context, payload} = message;
    var {name, path, projectPath, flat, version} = payload;
    console.log(version);
    var id = guid();
    var logger = {
        log: (message) => {
            postMessage({type: "partial", data: {type: "log", message}});
        },
        error: (message) => {
            postMessage({type: "partial", data: {type: "error", message}});
        }
    }
    logger.log("loading project: " + name)
    var project = deserializeProject(name, path, logger);
    logger.log(name + " loaded");
    var pl = projectList(context.appFolder);
    var currentProjectList = pl.get();
    
    // if we have been given a project path, the user has selected one
    // they may also have set the flat property, which means put the project folders and files directly
    // in the selected folder. Otherwise, make a folder with the id as name first
    if(projectPath && projectPath.length){
        if(flat == "no"){
            projectPath = join(projectPath, id);
        }
    } else{
        projectPath = join(context.appFolder, id);
    }
    initFolder(projectPath);
    currentProjectList.push({
        name,
        id,
        projectPath,
        lastAccessed: new Date().getTime()
    });
    pl.set(currentProjectList);
    var commentsObj = {
        common: project.commonComments,
        history: project.historyComments,
        events: project.eventsComments
    };
    var filesObj = {
        id,
        baseFilePath: project.baseFilePath,
        common: project.common,
        history: project.history,
        events: project.events
    };
    var projectSettingsObj = {
        baseGameVersion: version,
        name
    };
    comments(context.appFolder).set(id, commentsObj);
    projectSettings(context.appFolder).set(id, projectSettingsObj);
    files(context.appFolder).set(id, filesObj);
    exports(context.appFolder).set(id, project.export);
    logger.log("copying images");
    var projectImages = importImages(path, projectPath, project.images);
    logger.log("finished copying images");
    images(context.appFolder).set(id, projectImages);

    postMessage({type: "done", data :{
        id: id,
        files: filesObj,
        comments: commentsObj,
        projectSettings: projectSettingsObj,
        exports: project.export,
        images: projectImages
    }});
}