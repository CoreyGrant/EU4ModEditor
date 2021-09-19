import fs from 'fs';
import path from 'path';

import { projectList, appSettings } from './appData';
import iconv from 'iconv-lite';
import { v4 as guid } from 'uuid';

const projectSettingsFileName = "projectSettings.json";
const filesFileName = "files.json";
const commentsFileName = "comments.json";
const exportsFileName = "exports.json";
const imagesFileName = "images.json";

var comments = (folderName) => ({
    get: (id) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        return JSON.parse(
            fs.readFileSync(
                path.join(projectPath, commentsFileName)));
    },
    set: (id, a) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        var prettyPrint = appSettings(folderName).get().prettyPrint == "yes";
        fs.writeFileSync(
            path.join(projectPath, commentsFileName),
            prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a));
    }
})

var projectSettings = (folderName) => ({
    get: (id) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        return JSON.parse(
            fs.readFileSync(
                path.join(projectPath, projectSettingsFileName)));
    },
    set: (id, a) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        var prettyPrint = appSettings(folderName).get().prettyPrint == "yes";
        fs.writeFileSync(
            path.join(projectPath, projectSettingsFileName),
            prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a));
    }
})

var files = (folderName) => ({
    get: (id) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        return JSON.parse(
            fs.readFileSync(
                path.join(projectPath, filesFileName)));
    },
    set: (id, a) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        var prettyPrint = appSettings(folderName).get().prettyPrint == "yes";
        fs.writeFileSync(
            path.join(projectPath, filesFileName),
            iconv.encode(prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a), "utf8"));
    }
})

var exports = (folderName) => ({
    get: (id) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        return JSON.parse(
            fs.readFileSync(
                path.join(projectPath, exportsFileName)));
    },
    set: (id, a) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        var prettyPrint = appSettings(folderName).get().prettyPrint == "yes";
        fs.writeFileSync(
            path.join(projectPath, exportsFileName),
            prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a));
    }
})

var images = (folderName) => ({
    get: (id) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        return JSON.parse(
            fs.readFileSync(
                path.join(projectPath, imagesFileName)));
    },
    set: (id, a) => {
        var projectPath = projectList(folderName).get().find(x => x.id == id).projectPath;
        var prettyPrint = appSettings(folderName).get().prettyPrint == "yes";
        fs.writeFileSync(
            path.join(projectPath, imagesFileName),
            prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a));
    }
})

function importImages(importPath, projectPath, images, copy = true){
    var imageFolder;
    if(copy){
        imageFolder = path.join(projectPath, "images");
        if(!fs.existsSync(imageFolder)){
            fs.mkdirSync(imageFolder);
        }
    }
    var imagesOutput = {}
    for(var image of images){
        image.id = guid();
        if(copy){
            var fullPath = image.fullPath;
            var ext = path.extname(fullPath);
            var imageFilePath = path.join(imageFolder, image.id + ext);
            fs.copyFileSync(fullPath, imageFilePath);
        }
        var localPath = image.fullPath.replace(importPath, '');
        imagesOutput[image.id] = {
            id: image.id,
            localPath
        };
    }
    return imagesOutput;
}

function initFolder(path){
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

export{
    comments,
    projectSettings,
    files,
    exports,
    images,
    initFolder,
    importImages
}