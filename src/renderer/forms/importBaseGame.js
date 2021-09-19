
var importBaseGameForm = [{
    label: "Version",
    type: "text",
    set: (ip, val) => ip.version = val,
    get: (ip) => ip.version,
    validators: ["eu4Version"],
},{
    label: "EU4 folder",
    type: "folder",
    hint: "Contains the common/events/map folders with all the EU4 data",
    set: (ip, val) => ip.path = val,
    get: (ip) => ip.path,
}];

export {
    importBaseGameForm,
};