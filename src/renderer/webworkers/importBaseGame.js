import {baseGame, baseGameVersions} from '../../shared/file/baseGameData';
import {deserializeProject} from '../../shared/parser/projectSerializer';

import {importImages} from '../../shared/file/projectData';
self.onmessage = function(e){
    var message = e.data;
    var {context, payload} = message;
    var {version, path} = payload;
    var logger = {
        log: (message) => {
            self.postMessage({type: "partial", data: {type: "log", message}});
        },
        error: (message) => {
            self.postMessage({type: "partial", data: {type: "error", message}});
        }
    }
    logger.log("loading base game: " + version);
    var project = deserializeProject("baseGame", path, logger);
    logger.log(version + " loaded");
    var filesObj = {
        common: project.common,
        history: project.history,
        events: project.events
    };
    var commentsObj = {
        common: project.commonComments,
        history: project.historyComments,
        events: project.eventsComments
    };

    var projectImages = importImages(path, "", project.images, false);

    baseGame(context.appFolder).set(version, {
        files: filesObj,
        comments: commentsObj,
        exports: project.export,
        images: projectImages
    });

    //var output = baseGameVersions(context.appFolder).get();

    self.postMessage({type: "done"});
}