import fs from 'fs';
import {ProjectFolder, ProjectFile, Project, ProjectExport} from '../../models/project';
import path from 'path';
import {deserialize} from './serializer';
import { convertCommonFolder, convertEventsFolder, convertHistoryFolder } from './folderConverters';

function convertFoldersToProject(name, projectPath, rootFolders){
    // When importing a new project, we need to read all the file into our format
    // while parsing the structure to form the export settings so we can export 
    // back out in the same files.
    // Also need to assign ids to each and every object
    var historyFolder = rootFolders.find(x => x.name == "history");
    var commonFolder = rootFolders.find(x => x.name == "common");
    var eventsFolder = rootFolders.find(x => x.name == "events");
    var [common, commonExports] = convertCommonFolder(commonFolder);
    var [history, historyExports] = convertHistoryFolder(historyFolder);
    var [events, eventsExports] = convertEventsFolder(eventsFolder);
    var allExports = [...commonExports, ...historyExports, ...eventsExports];
    var projectExport = new ProjectExport();
    projectExport.basePath = projectPath;
    projectExport.objectExports = allExports;
    return new Project(name, projectPath, projectExport, common, history, events)
}

function deserializeProject(name, projectPath){
    var files = fs.readdirSync(projectPath, {withFileTypes: true});
    var folders = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(projectPath, file.name)));
        }
    }
    return convertFoldersToProject(name, projectPath, folders);
}

function deserializeFolder(folderPath){
    var files = fs.readdirSync(folderPath, {withFileTypes: true});
    var folderNameParts = folderPath.split('\\');
    var folderName = folderNameParts[folderNameParts.length - 1];
    var actualFiles = [];
    var folders = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(folderPath, file.name)));
            continue;
        }
        if(file.isFile()){
            var file = deserializeFile(path.join(folderPath, file.name));
            if(file != null){
                actualFiles.push(file);
            }
        }
    }
    return new ProjectFolder(folderName, folders, actualFiles, folderPath);
}
function deserializeFile(filePath){
    try{
        var file = fs.readFileSync(filePath);
        var ext = path.extname(filePath);
        var filename = path.basename(filePath);
        if(ext == '.txt'){
            var fileData = deserialize(file.toString());
            return new ProjectFile(filename, fileData, 0, filePath);
        } else if(ext == '.tga'){
            return new ProjectFile(filename, null, 2, filePath);
        }
        return null;
    } catch(err){
        return null;
    }

}

export {
    deserializeProject
}