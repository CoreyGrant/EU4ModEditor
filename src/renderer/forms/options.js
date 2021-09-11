
var optionsForm = [{
    label: "EU4 Path",
    type: "folder",
    hint: "The folder which contains the EU4 game data",
    set: (options, val) => options.eu4Path = val,
    get: (options) => options.eu4Path,
},{
    label: "Pretty print save",
    type: "select",
    options: "yesno",
    hint: "Project files will be pretty printed. Very useful if using version control for project files, but saving will be slower for large projects",
    set: (options, val) => options.prettyPrint = val,
    get: (options) => options.prettyPrint,
}];

export {
    optionsForm,
};