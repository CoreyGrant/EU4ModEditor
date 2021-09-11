import {app, ipcMain} from 'electron';
import {getName} from '../../utilities/ipcNameHelper';
import path from 'path';
import { v4 as guid } from 'uuid';
import fs from 'fs';
import tga2png from 'tga2png';

var userDataPath = app.getPath("userData");
const projectsFolderName = path.join(userDataPath, "projects");
const imageCache = {};
const getImageName = getName('image', 'loadImage');
ipcMain.on(getImageName.name, (event, arg) => {
    var imageId = arg[0];
    var projectName = arg[1];
    var imageB64 = imageCache[imageId];
    if(imageB64){
        event.reply(getImageName.reply, imageB64);
        return;
    }
    var fileName = path.join(projectsFolderName, projectName, "images", imageId + ".tga");
    var imageContents = Buffer.from(fs.readFileSync(fileName));
    tga2png(imageContents).then(buf => {
        imageB64 = buf.toString("base64");
        imageCache[imageId] = imageB64;
        event.reply(getImageName.reply, imageB64)
    }, err => {
        event.reply(getImageName.reply, null)
    })
    
})