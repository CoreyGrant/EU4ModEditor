"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.baseGameStore = exports.appStore = exports.baseGameObjectStore = exports.objectStore = exports.projectStore = exports.events = exports.state = void 0;
var models_1 = require("./models");
var workers_js_1 = require("../../webworkers/workers.js");
// needs to be a high performance data store.
exports.state = new models_1.AppState(new models_1.App(window.eu4modeditor["default"].projectList || new models_1.ProjectList(), window.eu4modeditor["default"].appSettings || new models_1.AppSettings("no"), window.eu4modeditor["default"].baseGameVersions || []), {}, {});
var StateEvents = /** @class */ (function () {
    function StateEvents() {
        this.projectLoaded = new StateEvent("projectLoaded");
        this.projectImported = new StateEvent("projectImported");
        this.projectListLoaded = new StateEvent("projectListLoaded");
        this.baseGameLoaded = new StateEvent("baseGameLoaded");
        this.baseGameImported = new StateEvent("baseGameImported");
        this.baseGameVersionsLoaded = new StateEvent("baseGameVersionsLoaded");
        this.appSettingsLoaded = new StateEvent("appSettingsLoaded");
        this.appSettingsSaved = new StateEvent("appSettingsSaved");
    }
    return StateEvents;
}());
var StateEvent = /** @class */ (function () {
    function StateEvent(name) {
        this.id = 0;
        this.callbacks = {};
        this.name = name;
    }
    StateEvent.prototype.getId = function () {
        return (this.id++).toString();
    };
    StateEvent.prototype.register = function (callback) {
        var id = this.getId();
        this.callbacks[id] = (callback);
    };
    StateEvent.prototype.trigger = function () {
        for (var key in this.callbacks) {
            console.log(this.name + " trigger");
            this.callbacks[key]();
        }
    };
    StateEvent.prototype.deregister = function (id) {
        delete this.callbacks[id];
    };
    return StateEvent;
}());
exports.events = new StateEvents();
var ProjectStore = /** @class */ (function () {
    function ProjectStore() {
    }
    ProjectStore.prototype.loadProject = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.loadProject)({ id: id })
                            .then(function (_a) {
                            var files = _a.files, projectSettings = _a.projectSettings, comments = _a.comments, ex = _a.exports, images = _a.images;
                            exports.state.projects[id] = new models_1.Project(files, comments, images, ex, projectSettings);
                        }).then(function () { return exports.events.projectLoaded.trigger(); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ProjectStore.prototype.importProject = function (_a) {
        var name = _a.name, path = _a.path, projectPath = _a.projectPath, flat = _a.flat, version = _a.version, update = _a.update;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.importProject)({ name: name, path: path, projectPath: projectPath, flat: flat, version: version }, update)
                            .then(function (_a) {
                            var id = _a.id, files = _a.files, comments = _a.comments, projectSettings = _a.projectSettings, ex = _a.exports, images = _a.images;
                            exports.state.projects[id] = new models_1.Project(files, comments, images, ex, projectSettings);
                            exports.events.projectImported.trigger();
                            return { id: id };
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ProjectStore.prototype.loaded = function (projectId) {
        return !!exports.state.projects[projectId];
    };
    ProjectStore.prototype.getFiles = function (projectId) {
        return exports.state.projects[projectId].files;
    };
    ProjectStore.prototype.getComments = function (projectId) {
        return exports.state.projects[projectId].comments;
    };
    ProjectStore.prototype.getImages = function (projectId) {
        return exports.state.projects[projectId].images;
    };
    ProjectStore.prototype.getExports = function (projectId) {
        return exports.state.projects[projectId].exports;
    };
    ProjectStore.prototype.getProjectSettings = function (projectId) {
        return exports.state.projects[projectId].projectSettings;
    };
    return ProjectStore;
}());
var BaseGameStore = /** @class */ (function () {
    function BaseGameStore() {
    }
    BaseGameStore.prototype.loadBaseGame = function (_a) {
        var version = _a.version;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.loadBaseGame)({ version: version })
                            .then(function (_a) {
                            var files = _a.files, comments = _a.comments, ex = _a.exports, images = _a.images;
                            exports.state.baseGame[version] = new models_1.BaseGame(files, comments, images, ex);
                        }).then(function () { return exports.events.baseGameLoaded.trigger(); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    BaseGameStore.prototype.importBaseGame = function (_a) {
        var path = _a.path, version = _a.version, update = _a.update;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.importBaseGame)({ path: path, version: version }, update)
                            .then(function () { return exports.events.baseGameImported.trigger(); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    BaseGameStore.prototype.getFiles = function (version) {
        return exports.state.baseGame[version].files;
    };
    BaseGameStore.prototype.getComments = function (version) {
        return exports.state.baseGame[version].comments;
    };
    BaseGameStore.prototype.getImages = function (version) {
        return exports.state.baseGame[version].images;
    };
    BaseGameStore.prototype.getExports = function (version) {
        return exports.state.baseGame[version].exports;
    };
    return BaseGameStore;
}());
var BaseGameObjectStore = /** @class */ (function () {
    function BaseGameObjectStore() {
    }
    BaseGameObjectStore.prototype.getObject = function (version, folder1, folder2, objectId) {
        if (!exports.state.baseGame[version]) {
            return null;
        }
        var obj = exports.state.baseGame[version].files[folder1][folder2][objectId];
        return obj;
    };
    BaseGameObjectStore.prototype.getObjectByComparison = function (version, folder1, folder2, comparison) {
        if (!exports.state.baseGame[version]) {
            return null;
        }
        var objs = exports.state.baseGame[version].files[folder1][folder2];
        return Object.values(objs).find(comparison);
    };
    return BaseGameObjectStore;
}());
var ObjectStore = /** @class */ (function () {
    function ObjectStore() {
    }
    ObjectStore.prototype.getObject = function (projectId, folder1, folder2, objectId) {
        var obj = exports.state.projects[projectId].files[folder1][folder2][objectId];
        return obj;
    };
    ObjectStore.prototype.getComment = function (projectId, folder1, folder2, objectId) {
        var obj = exports.state.projects[projectId].comments[folder1][folder2][objectId];
        return obj;
    };
    return ObjectStore;
}());
var AppStore = /** @class */ (function () {
    function AppStore() {
    }
    AppStore.prototype.loadProjectList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.loadProjectList)().then(function (projectList) {
                            exports.state.app.projectList = projectList;
                        }).then(function () { return exports.events.projectListLoaded.trigger(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppStore.prototype.loadBaseGameVersions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.loadBaseGameVersions)().then(function (baseGameVersions) {
                            exports.state.app.baseGameVersions = baseGameVersions;
                        }).then(function () { return exports.events.baseGameVersionsLoaded.trigger(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppStore.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.loadSettings)().then(function (settings) {
                            exports.state.app.settings = settings;
                        }).then(function () { return exports.events.appSettingsLoaded.trigger(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppStore.prototype.saveSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, workers_js_1.saveSettings)(settings)
                            .then(function () {
                            exports.state.app.settings = settings;
                        }).then(function () { return exports.events.appSettingsSaved.trigger(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppStore.prototype.getSettings = function () {
        return exports.state.app.settings;
    };
    AppStore.prototype.getProjectList = function () {
        return exports.state.app.projectList;
    };
    AppStore.prototype.getBaseGameVersions = function () {
        return exports.state.app.baseGameVersions;
    };
    return AppStore;
}());
exports.projectStore = new ProjectStore();
exports.objectStore = new ObjectStore();
exports.baseGameObjectStore = new BaseGameObjectStore();
exports.appStore = new AppStore();
exports.baseGameStore = new BaseGameStore();
// reload the project list when we import a project
exports.events.projectImported.register(function () {
    exports.appStore.loadProjectList();
});
exports.events.baseGameImported.register(function () {
    exports.appStore.loadBaseGameVersions();
});
