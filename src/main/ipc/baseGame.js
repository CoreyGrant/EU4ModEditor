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
const loadBaseGameName = getName('baseGame', 'loadBaseGame');
const importBaseGameName = getName('baseGame', 'importBaseGame');
var optionsFileName = path.join(projectFolderName, "options.json");

ipcMain.on(loadBaseGameName.name, (event, arg) => {
    var baseGame = readBaseGame();
    event.reply(loadBaseGameName.reply, JSON.stringify(baseGame));
})

ipcMain.on(importBaseGameName.name, (event, arg) => {
    try{
    var baseGamePath = arg.path;
    writeBaseGame(baseGamePath);
    event.reply(importBaseGameName.reply, JSON.stringify(baseGame));
    } catch(err) {
        event.reply(importBaseGameName.reply, JSON.stringify({error: err}));
    }
})

export function writeBaseGame(baseGamePath){
    console.log("BaseGame IPC: writeBaseGame");
    var baseGame = deserializeProject("Europa_Universalis_4", baseGamePath);
    var imagesFolderPath = path.join(projectFolderName, "images");
    fs.mkdirSync(imagesFolderPath);
    copyAndRenameImages(baseGame.images, imagesFolderPath);
    var projectFilePath = path.join(projectFolderName, "baseGame.json");
    if(fs.existsSync(projectFilePath)){
        fs.unlinkSync(projectFilePath, () => {});
    }
    var options = JSON.parse(fs.readFileSync(optionsFileName));
    fs.writeFileSync(projectFilePath, 
        options.prettyPrint == 'yes' 
            ? JSON.stringify(baseGame, null, 2) 
            : JSON.stringify(baseGame)
        );
}

function copyAndRenameImages(images, imageFolder){
    for(var image of images){
        var id = guid();
        image.id = id;
        var ext = path.extname(image.fullPath);
        var imageFilename = path.join(imageFolder, id + ext);
        fs.copyFileSync(image.fullPath, imageFilename);
    }
}

function readBaseGame(){
    var filePath = path.join(projectFolderName,  "baseGame.json");
    if(!fs.existsSync(filePath)){return;}
    return JSON.parse(fs.readFileSync(filePath));
}