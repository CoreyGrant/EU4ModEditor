import {app, ipcMain} from 'electron';
import {getName} from '../../utilities/ipcNameHelper';
import path from 'path';
import { v4 as guid } from 'uuid';
import fs from 'fs';
import { deserializeProject } from '../serializer/projectSerializer';

var userDataPath = app.getPath("userData");
const projectFolderName = path.join(userDataPath, "eu4modeditor-projects");
if(!fs.existsSync(projectFolderName)){
    fs.mkdirSync(projectFolderName);
}
const loadProjectName = getName('project', 'loadProject');
const importProjectName = getName('project', 'importProject');
const getProjectSummariesName = getName('project', 'getProjectSummaries');
const saveProjectName = getName('project', 'saveProject');
var optionsFileName = path.join(projectFolderName, "options.json");

ipcMain.on(saveProjectName.name, (event, arg) => {
    var project = arg;
    writeProject(project.name, project);
})

ipcMain.on(loadProjectName.name, (event, arg) => {
    var name = arg;
    var project = readProject(name);
    event.reply(loadProjectName.reply, JSON.stringify(project));
    
    
})

ipcMain.on(importProjectName.name, (event, arg) => {
    try{
    var projectName = arg.name;
    var projectPath = arg.path;
    var project = deserializeProject(projectName, projectPath);
    writeProject(projectName, project);
    event.reply(importProjectName.reply, JSON.stringify(project));
    } catch(err) {
        event.reply(importProjectName.reply, JSON.stringify({error: err}));
    }
})

ipcMain.on(getProjectSummariesName.name, (event, arg) => {
    var summaries = getProjectSummaries();
    event.reply(getProjectSummariesName.reply, summaries);
})

function getProjectSummaries(){
    var files = fs.readdirSync(projectFolderName);
    var projectNames = files.filter(x => x.indexOf(".json") === -1);
    return projectNames;
}

function writeProject(name, projectObj){
    var folderPath = path.join(projectFolderName, name);
    fs.mkdirSync(folderPath);
    //var imagesFolderPath = path.join(folderPath, "images");
    //fs.mkdirSync(imagesFolderPath);
    //copyAndRenameImages(projectObj.folders, imagesFolderPath);
    var projectFilePath = path.join(folderPath, "files.json");
    if(fs.existsSync(projectFilePath)){
        fs.unlinkSync(projectFilePath);
    }
    var options = JSON.parse(fs.readFileSync(optionsFileName));
    fs.writeFileSync(projectFilePath, 
        options.prettyPrint == 'yes' 
            ? JSON.stringify(projectObj, null, 2) 
            : JSON.stringify(projectObj)
        );
}

function copyAndRenameImages(folders, imageFolder){
    for(var i = 0; i < folders.length; i++){
        var folder = folders[i];
        for(var j = 0; j < folder.files.length; j++){
            var file = folder.files[j];
            if(file.type == 2){
                var id = guid();
                var imageFilename = path.join(imageFolder, id + ".tga");
                // tga file, we need to copy it to the folder
                fs.copyFileSync(file.fullPath, imageFilename);
                file.localPath = imageFilename;
                file.id = id;
            }
        }
        copyAndRenameImages(folder.folders, imageFolder);
    }
}

function readProject(name){
    return JSON.parse(fs.readFileSync(path.join(projectFolderName, name, "files" + ".json")));
}