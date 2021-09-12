
var importProjectForm = [{
    label: "Project name",
    type: "text",
    set: (ip, val) => ip.projectName = val,
    get: (ip) => ip.projectName,
    validators: ["euProp"],
    mask: ["euProp"],
},{
    label: "Project path",
    type: "folder",
    hint: "Usually has the mod id as the name, and contains the common/events/map folders with all the mod data.",
    set: (ip, val) => ip.projectPath = val,
    get: (ip) => ip.projectPath,
}];

export {
    importProjectForm,
};