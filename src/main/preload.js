//var { contextBridge } = require("electron");
var rendererApi = require('./rendererApi').default;

window["eu4modeditor"] = rendererApi;