import { WebWorkerMessage, WebWorkerResponse } from "../shared/models/webWorkerMessage"
import path from 'path';
var userDataPath = path.join((process.env.APPDATA 
    || (process.platform == 'darwin' 
        ? process.env.HOME + '/Library/Preferences' 
        : process.env.HOME + "/.local/share")), "Electron")
var appFolder = path.join(userDataPath, "eu4modeditor-projects");
import {appSettings, projectList} from '../shared/file/appData';
import {baseGameVersions} from '../shared/file/baseGameData';
export default {
    default: {
        projectList: projectList(appFolder).get(),
        appSettings: appSettings(appFolder).get(),
        baseGameVersions: baseGameVersions(appFolder).get()
    },
    models: {
        WebWorkerMessage,
        WebWorkerResponse
    },
    appFolder
};