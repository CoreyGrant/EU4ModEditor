import fs from 'fs';
import {ProjectFolder, ProjectFile, Project, ProjectExport} from '../models/project';
import path from 'path';
import {getTokens} from './lexer';
import {parseTokens} from './tokenParser';
import { convertCommonFolder, convertEventsFolder, convertHistoryFolder } from './folderConverters';
import iconv from 'iconv-lite';

function convertFoldersToProject(name, projectPath, rootFolders, images, logger){
    // When importing a new project, we need to read all the file into our format
    // while parsing the structure to form the export settings so we can export 
    // back out in the same files.
    // Also need to assign ids to each and every object
    var historyFolder = rootFolders.find(x => x.name == "history");
    var commonFolder = rootFolders.find(x => x.name == "common");
    var eventsFolder = rootFolders.find(x => x.name == "events");
    var [common, commonExports, commonComments] = convertCommonFolder(commonFolder);
    var [history, historyExports, historyComments] = convertHistoryFolder(historyFolder);
    var [events, eventsExports, eventsComments] = convertEventsFolder(eventsFolder);
    var allExports = [...commonExports, ...historyExports, ...eventsExports];
    var projectExport = new ProjectExport();
    projectExport.basePath = projectPath;
    projectExport.objectExports = allExports;
    return new Project(name, projectPath, projectExport, common, history, events, images, commonComments, historyComments, eventsComments);
}

function deserializeProject(name, projectPath, logger){
    var files = fs.readdirSync(projectPath, {withFileTypes: true});
    var folders = [];
    var images = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(projectPath, file.name), images, projectPath, logger));
        }
    }
    return convertFoldersToProject(name, projectPath, folders, images, logger);
}

function deserializeFolder(folderPath, images, projectPath,logger){
    logger.log("parsing folder: " + folderPath);
    var files = fs.readdirSync(folderPath, {withFileTypes: true});
    var folderNameParts = folderPath.split('\\');
    var folderName = folderNameParts[folderNameParts.length - 1];
    var actualFiles = [];
    var folders = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(folderPath, file.name), images, projectPath, logger));
            continue;
        }
        if(file.isFile()){
            var file = deserializeFile(path.join(folderPath, file.name), images, projectPath, logger);
            if(file != null){
                actualFiles.push(file);
            }
        }
    }
    return new ProjectFolder(folderName, folders, actualFiles, folderPath);
}
function deserializeFile(filePath, images, projectPath, logger){
    try{
        //logger.log("Reading file: " + filePath);
        
        var ext = path.extname(filePath);
        var filename = path.basename(filePath);
        if(ext == '.txt'){
            var file = fs.readFileSync(filePath);
            var win1252File = iconv.decode(file, "win1252");
            try{
            var fileData = parseTokens(getTokens(win1252File));
            return new ProjectFile(filename, fileData[0], 0, filePath, fileData[1]);
            } catch{logger.error(filePath.replace(projectPath, ''))}
        } else if(ext == '.tga' || ext == '.dds'){
            var projectFile = new ProjectFile(filename, null, ext == '.tga' ? 2 : 3, filePath);
            projectFile.localPath = filePath.replace(projectPath, '');
            images.push(projectFile);
        }
        return null;
    } catch(err){
        logger.log("Failed to deserialize file:", err.message);
    }

}

export {
    deserializeProject
}