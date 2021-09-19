"use strict";
exports.__esModule = true;
exports.EuObject = exports.Image = exports.EuObjectComments = exports.BaseGame = exports.ProjectSettings = exports.Project = exports.AppSettings = exports.ProjectList = exports.App = exports.AppState = void 0;
var AppState = /** @class */ (function () {
    function AppState(app, projects, baseGame) {
        this.app = app;
        this.projects = projects;
        this.baseGame = baseGame;
    }
    return AppState;
}());
exports.AppState = AppState;
var App = /** @class */ (function () {
    function App(projectList, settings, baseGameVersions) {
        this.projectList = projectList;
        this.settings = settings;
        this.baseGameVersions = baseGameVersions;
    }
    return App;
}());
exports.App = App;
var ProjectList = /** @class */ (function () {
    function ProjectList() {
    }
    return ProjectList;
}());
exports.ProjectList = ProjectList;
var AppSettings = /** @class */ (function () {
    function AppSettings(prettyPrint) {
        this.prettyPrint = prettyPrint;
    }
    return AppSettings;
}());
exports.AppSettings = AppSettings;
var Project = /** @class */ (function () {
    function Project(files, comments, images, exports, projectSettings) {
        this.files = files;
        this.comments = comments;
        this.images = images;
        this.exports = exports;
        this.projectSettings = projectSettings;
    }
    return Project;
}());
exports.Project = Project;
var ProjectSettings = /** @class */ (function () {
    function ProjectSettings(baseGameVersion, name) {
        this.baseGameVersion = baseGameVersion;
        this.name = name;
    }
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;
var BaseGame = /** @class */ (function () {
    function BaseGame(files, comments, images, exports) {
        this.files = files;
        this.comments = comments;
        this.images = images;
        this.exports = exports;
    }
    return BaseGame;
}());
exports.BaseGame = BaseGame;
var EuObjectComments = /** @class */ (function () {
    function EuObjectComments(id, data) {
        this.id = id;
        this.data = data;
    }
    return EuObjectComments;
}());
exports.EuObjectComments = EuObjectComments;
var Image = /** @class */ (function () {
    function Image() {
    }
    return Image;
}());
exports.Image = Image;
var EuObject = /** @class */ (function () {
    function EuObject(id, name, data) {
        this.id = id;
        this.name = name;
        this.data = data;
    }
    return EuObject;
}());
exports.EuObject = EuObject;
