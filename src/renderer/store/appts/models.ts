export type AppProjects = {[id: string]: Project};
export type AppBaseGames = {[version: string]: BaseGame};

export class AppState{
    constructor(app: App, projects: AppProjects, baseGame: AppBaseGames){
        this.app = app;
        this.projects = projects;
        this.baseGame = baseGame;
    }
    public app: App;
    public projects: AppProjects;
    public baseGame: AppBaseGames;
}

export class App{
    constructor(projectList: ProjectList, settings: AppSettings, baseGameVersions: string[]){
        this.projectList = projectList;
        this.settings = settings;
        this.baseGameVersions = baseGameVersions;
    }
    public projectList: ProjectList;
    public settings: AppSettings;
    public baseGameVersions: string[];
}

export class ProjectList{

}

export class AppSettings{
    constructor(prettyPrint: string){
        this.prettyPrint = prettyPrint;
    }
    public prettyPrint: string;
}

export class Project{
    constructor(files: Files, comments: Comments, images: any, exports: any, projectSettings: ProjectSettings){
        this.files = files;
        this.comments = comments;
        this.images = images;
        this.exports = exports;
        this.projectSettings = projectSettings;
    }
    public files: Files;
    public comments: Comments;
    public images: any;
    public exports: any;
    public projectSettings: ProjectSettings;
}

export class ProjectSettings{
    constructor(baseGameVersion: string, name: string){
        this.baseGameVersion = baseGameVersion;
        this.name = name;
    }
    public baseGameVersion: string;
    public name: string;
}

export class BaseGame{
    constructor(files: Files, comments: Comments, images: any, exports: any){
        this.files = files;
        this.comments = comments;
        this.images = images;
        this.exports = exports;
    }
    public files: Files;
    public comments: Comments;
    public images: any;
    public exports: any;
}

export type Comments = File<EuObjectComments>;

export class EuObjectComments{
    constructor(id:string, data: any){
        this.id = id;
        this.data = data;
    }
    public id: string;
    public data: any;
}

export class Image{

}

export type File<T> = {
    [topFolder: string]: {[bottomFolder: string]: {[id: string]: T}}
};

export type Files = File<EuObject>;

export class EuObject{
    constructor(id:string, name: string, data: any){
        this.id = id;
        this.name = name;
        this.data = data;
    }
    public id: string;
    public name: string;
    public data: any;
}