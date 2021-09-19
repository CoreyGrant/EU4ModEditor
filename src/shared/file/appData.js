import fs from 'fs';
import path from 'path';

var appSettingsObj;
var projectListObj;


var appSettings = (folderName) => ({
    get: () => {
        if(!appSettingsObj){
            appSettingsObj = JSON.parse(fs.readFileSync(path.join(folderName, "appSettings.json")));
        }
        return JSON.parse(JSON.stringify(appSettingsObj));
    },
    set: (a) => {
        var aString = JSON.stringify(a);
        appSettingsObj = JSON.parse(aString);
        fs.writeFileSync(path.join(folderName, "appSettings.json"), aString);
    }
})

var projectList = (folderName) => ({
    get: () => {
        if(!projectListObj){
            projectListObj = JSON.parse(fs.readFileSync(path.join(folderName, "projectList.json")));
        }
        return JSON.parse(JSON.stringify(projectListObj)).list;
    },
    set: (a) => {
        var aString = JSON.stringify({list: a});
        projectListObj = JSON.parse(aString);
        fs.writeFileSync(path.join(folderName, "projectList.json"), aString);
    }
})

function init(folderName){
    // write default objects to file
    if(!fs.existsSync(path.join(folderName, "projectList.json"))){
        projectList(folderName).set([]);
    }
    if(!fs.existsSync(path.join(folderName, "appSettings.json"))){
        appSettings(folderName).set({
            prettyPrint: "no"
        })
    }
}


export{
    projectList,
    appSettings,
    init
}