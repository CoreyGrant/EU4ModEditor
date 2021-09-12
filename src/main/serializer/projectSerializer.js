import fs from 'fs';
import {ProjectFolder, ProjectFile, Project, ProjectExport} from '../../models/project';
import path from 'path';
import {deserialize} from './serializer';
import { convertCommonFolder, convertEventsFolder, convertHistoryFolder } from './folderConverters';

function convertFoldersToProject(name, projectPath, rootFolders, images){
    // When importing a new project, we need to read all the file into our format
    // while parsing the structure to form the export settings so we can export 
    // back out in the same files.
    // Also need to assign ids to each and every object
    console.log("Converting folders to project structure");
    var historyFolder = rootFolders.find(x => x.name == "history");
    var commonFolder = rootFolders.find(x => x.name == "common");
    var eventsFolder = rootFolders.find(x => x.name == "events");
    var [common, commonExports] = convertCommonFolder(commonFolder);
    console.log("Converted common");
    var [history, historyExports] = convertHistoryFolder(historyFolder);
    console.log("Converted history");
    var [events, eventsExports] = convertEventsFolder(eventsFolder);
    console.log("Converted events");
    var allExports = [...commonExports, ...historyExports, ...eventsExports];
    var projectExport = new ProjectExport();
    projectExport.basePath = projectPath;
    projectExport.objectExports = allExports;
    return new Project(name, projectPath, projectExport, common, history, events, images)
}

function deserializeProject(name, projectPath){
    console.log("Deserializing folder: '" + projectPath +"' for '" + name + "'");
    var files = fs.readdirSync(projectPath, {withFileTypes: true});
    var folders = [];
    var images = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(projectPath, file.name), images, projectPath));
        }
    }
    return convertFoldersToProject(name, projectPath, folders, images);
}

function deserializeFolder(folderPath, images, projectPath){
    var files = fs.readdirSync(folderPath, {withFileTypes: true});
    var folderNameParts = folderPath.split('\\');
    var folderName = folderNameParts[folderNameParts.length - 1];
    var actualFiles = [];
    var folders = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.isDirectory()){
            folders.push(deserializeFolder(path.join(folderPath, file.name), images, projectPath));
            continue;
        }
        if(file.isFile()){
            var file = deserializeFile(path.join(folderPath, file.name), images, projectPath);
            if(file != null){
                actualFiles.push(file);
            }
        }
    }
    return new ProjectFolder(folderName, folders, actualFiles, folderPath);
}
function deserializeFile(filePath, images, projectPath){
    try{
        var file = fs.readFileSync(filePath);
        var ext = path.extname(filePath);
        var filename = path.basename(filePath);
        if(ext == '.txt'){
            var fileData = deserialize(file.toString());
            return new ProjectFile(filename, fileData, 0, filePath);
        } else if(ext == '.tga' || ext == '.dds'){
            var projectFile = new ProjectFile(filename, null, ext == '.tga' ? 2 : 3, filePath);
            projectFile.localPath = filePath.replace(projectPath, '');
            images.push(projectFile);
        }
        return null;
    } catch(err){
        console.log("Failed to deserialize file", err.message);
    }

}

export {
    deserializeProject
}