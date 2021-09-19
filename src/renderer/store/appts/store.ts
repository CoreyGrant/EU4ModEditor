import {
    AppBaseGames,
    AppProjects,
    ProjectSettings,
    Comments,
    Files,
    EuObjectComments,
    Project,
    ProjectList,
    AppSettings,
    App,
    AppState,
    BaseGame,
    EuObject,
    File,
    Image
} from './models';
import {exportProject, importBaseGame, importProject, loadBaseGame, loadBaseGameVersions, loadProject, loadProjectList, loadSettings, saveSettings, updateProjectObject} from '../../webworkers/workers.js';

// needs to be a high performance data store.

export var state = new AppState(
    new App(
        (<any>window).eu4modeditor.default.projectList || new ProjectList(),
        (<any>window).eu4modeditor.default.appSettings || new AppSettings("no"),
        (<any>window).eu4modeditor.default.baseGameVersions || []
    ),
    {},
    {}
);

class StateEvents{
    public projectLoaded: StateEvent = new StateEvent("projectLoaded");
    public projectImported: StateEvent = new StateEvent("projectImported");
    public projectListLoaded: StateEvent = new StateEvent("projectListLoaded");
    public baseGameLoaded: StateEvent = new StateEvent("baseGameLoaded");
    public baseGameImported: StateEvent = new StateEvent("baseGameImported");
    public baseGameVersionsLoaded: StateEvent = new StateEvent("baseGameVersionsLoaded");
    public appSettingsLoaded: StateEvent = new StateEvent("appSettingsLoaded");
    public appSettingsSaved: StateEvent = new StateEvent("appSettingsSaved");
}

class StateEvent{
    private name:string;
    constructor(name:string){this.name = name;}
    private id: number = 0;
    private getId(): string{
        return (this.id++).toString();
    }
    private callbacks: any = {};
    public register(callback: any){
        var id = this.getId();
        this.callbacks[id] = (callback);
    }
    public trigger(){
        for(var key in this.callbacks){
            console.log(this.name + " trigger");
            this.callbacks[key]();
        }
    }
    public deregister(id: number){
        delete this.callbacks[id];
    }
}

export var events = new StateEvents();

class ProjectStore{
    async loadProject({id}: any): Promise<void>{
        return await loadProject({id})
            .then(({files, projectSettings, comments, exports: ex, images}) => {
                state.projects[id] = new Project(
                    files,
                    comments,
                    images,
                    ex, 
                    projectSettings
                );
            }).then(() => events.projectLoaded.trigger())
    }
    async importProject({name, path, projectPath, flat, version, update}: any): Promise<any>{
        return await importProject({name, path, projectPath, flat, version}, update)
            .then(({id, files, comments, projectSettings, exports: ex, images}: any) => {
                state.projects[id] = new Project(
                    files,
                    comments,
                    images,
                    ex, 
                    projectSettings
                );
                events.projectImported.trigger()
                return {id};
            });
    }
    loaded(projectId: string){
        return !!state.projects[projectId];
    }
    getFiles(projectId: string){
        return state.projects[projectId].files;
    }
    getComments(projectId: string){
        return state.projects[projectId].comments;
    }
    getImages(projectId: string){
        return state.projects[projectId].images;
    }
    getExports(projectId: string){
        return state.projects[projectId].exports;
    }
    getProjectSettings(projectId: string){
        return state.projects[projectId].projectSettings;
    }
}

class BaseGameStore{
    async loadBaseGame({version}: any): Promise<void>{
        return await loadBaseGame({version})
            .then(({files, comments, exports: ex, images}) => {
                state.baseGame[version] = new BaseGame(
                    files,
                    comments,
                    images,
                    ex
                );
            }).then(() => events.baseGameLoaded.trigger())
    }
    async importBaseGame({path, version, update}: any): Promise<void>{
        return await importBaseGame({path, version}, update)
            .then(() => events.baseGameImported.trigger());
    }
    getFiles(version: string){
        return state.baseGame[version].files;
    }
    getComments(version: string){
        return state.baseGame[version].comments;
    }
    getImages(version: string){
        return state.baseGame[version].images;
    }
    getExports(version: string){
        return state.baseGame[version].exports;
    }
}
class BaseGameObjectStore{
    getObject(
        version: string,
        folder1: string,
        folder2: string,
        objectId: string): EuObject|null{
            if(!state.baseGame[version]){return null}
        var obj = state.baseGame[version].files[folder1][folder2][objectId];
        return obj;
    }
    getObjectByComparison(version: string,
        folder1: string,
        folder2: string,
        comparison: any){
            if(!state.baseGame[version]){return null}
            var objs = state.baseGame[version].files[folder1][folder2];
            return Object.values(objs).find(comparison);
        }
}
class ObjectStore{
    getObject(
        projectId: string,
        folder1: string,
        folder2: string,
        objectId: string): EuObject{
        var obj = state.projects[projectId].files[folder1][folder2][objectId];
        return obj;
    }
    getComment(
        projectId: string,
        folder1: string,
        folder2: string,
        objectId: string): EuObjectComments{
        var obj = state.projects[projectId].comments[folder1][folder2][objectId];
        return obj;
    }
}

class AppStore{
    async loadProjectList(){
        return await loadProjectList().then((projectList: ProjectList) => {
            state.app.projectList = projectList;
        }).then(() => events.projectListLoaded.trigger());
    }
    async loadBaseGameVersions(){
        return await loadBaseGameVersions().then((baseGameVersions: string[]) => {
            state.app.baseGameVersions = baseGameVersions;
        }).then(() => events.baseGameVersionsLoaded.trigger());
    }
    async loadSettings(){
        return await loadSettings().then((settings: AppSettings) => {
            state.app.settings = settings;
        }).then(() => events.appSettingsLoaded.trigger());
    }
    async saveSettings(settings: any){
        return await saveSettings(settings)
            .then(() => {
                state.app.settings = settings;
            }).then(() => events.appSettingsSaved.trigger());
    }
    getSettings(){
        return state.app.settings;
    }
    getProjectList(){
        return state.app.projectList;
    }
    getBaseGameVersions(){
        return state.app.baseGameVersions;
    }
}

export var projectStore: ProjectStore = new ProjectStore();
export var objectStore: ObjectStore = new ObjectStore();
export var baseGameObjectStore: BaseGameObjectStore = new BaseGameObjectStore();
export var appStore: AppStore = new AppStore();
export var baseGameStore: BaseGameStore = new BaseGameStore();

// reload the project list when we import a project
events.projectImported.register(() => {
    appStore.loadProjectList();
});

events.baseGameImported.register(() => {
    appStore.loadBaseGameVersions();
})
