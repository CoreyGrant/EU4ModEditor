// import {app, ipcMain} from 'electron';
// import {getName} from '../../shared/ipcNameHelper';
// import path from 'path';
// import { v4 as guid } from 'uuid';
// import fs from 'fs';

// var userDataPath = app.getPath("userData");
// const projectFolderName = path.join(userDataPath, "eu4modeditor-projects");
// if(!fs.existsSync(projectFolderName)){
//     fs.mkdirSync(projectFolderName);
// }
// var optionsFileName = path.join(projectFolderName, "options.json");
// const saveOptionsName = getName('options', 'saveOptions');
// const loadOptionsName = getName('options', 'loadOptions');

// ipcMain.on(saveOptionsName.name, (event, arg) => {
//     var options = arg;
//     if(fs.existsSync(optionsFileName)){
//         fs.unlink(optionsFileName, () => {});
//     }
//     fs.writeFileSync(
//         optionsFileName,
//         options.prettyPrint == 'yes' 
//             ? JSON.stringify(options, null, 2) 
//             : JSON.stringify(options));
//     event.reply(saveOptionsName.reply, null);
// });

// ipcMain.on(loadOptionsName.name, (event, arg) => {
//     var file = fs.readFileSync(optionsFileName);
//     var options = JSON.parse(file);
//     event.reply(loadOptionsName.reply, JSON.stringify(options));
// });