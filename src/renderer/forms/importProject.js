
var importProjectForm = [{
    label: "Project name",
    type: "text",
    set: (ip, val) => ip.name = val,
    get: (ip) => ip.name,
    validators: ["euProp"],
    mask: "euProp",
},{
    label: "Import folder",
    type: "folder",
    hint: "Usually has the mod id as the name, and contains the common/events/map folders with all the mod data.",
    set: (ip, val) => ip.path = val,
    get: (ip) => ip.path,
},{
    label: "Project folder",
    type: "folder",
    hint: "Where the project will be saved.",
    set: (ip, val) => ip.projectPath = val,
    get: (ip) => ip.projectPath,
    optional: true,
},{
    label: "Flat",
    type: "select",
    options: "yesno",
    default: "yes",
    hint: "A new project folder will not be created, and files/folders will be put directly in the supplied project folder.",
    set: (ip, val) => ip.flat = val,
    get: (ip) => ip.flat,
    optional: true,
},{
    label: "Game version",
    type: "select",
    options: (state) => {
        return state.app.baseGameVersions;
    },
    optional: true,
    hint: "Which game version is the mod for? (can be updated later)",
    set: (ip, val) => ip.version = val,
    get: (ip) => ip.version,
}];

export {
    importProjectForm,
};