// import {app, ipcMain} from 'electron';
// import {getName} from '../../shared/ipcNameHelper';
// import path from 'path';
// import { v4 as guid } from 'uuid'
// import parseDds from 'parse-dds';
// import fs from 'fs';
// import tga2png from 'tga2png';
// //import convert from '../parser/dds';

// var userDataPath = app.getPath("userData");
// const projectFolderName = path.join(userDataPath, "eu4modeditor-projects");
// const imageCache = {};
// const getImageName = getName('image', 'loadImage');
// ipcMain.on(getImageName.name, (event, arg) => {
//     var imageId = arg.id;
//     var name = arg.name;
//     var format = arg.format;
//     var imageB64 = imageCache[imageId];
//     if(imageB64){
//         event.reply(getImageName.reply, imageB64);
//         return;
//     }
//     var fileName = name
//         ? path.join(projectFolderName, name, "images", imageId + "." + format)
//         : path.join(projectFolderName, "images", imageId + "." + format);
//     try{
//         var imageContents = Buffer.from(fs.readFileSync(fileName));
//     }catch{
//         console.log(fileName);
//     }
//     if(format == 'tga'){
//         tga2png(imageContents).then(buf => {
//             imageB64 = buf.toString("base64");
//             imageCache[imageId] = imageB64;
//             event.reply(getImageName.reply, imageB64)
//         }, err => {
//             event.reply(getImageName.reply, null)
//         });
//     } else if (format == 'dds'){
//         imageB64 = imageContents.toString("base64");
//         // dds files are parsed and displayed in a canvas
//         event.reply(getImageName.reply, imageB64)
//     }
// })