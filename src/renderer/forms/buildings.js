// meed a way to automatically calculate government_specific
var buildingForm = [{
    label: "Name",
    type: "text",
    set: (building, val) => building.name = val,
    get: (building) => building.name,
    validators: ["euProp"],
    mask: ["euProp"],
},
{
    label: "Cost",
    type: "number",
    step: 1,
    set: (building, val) => building.data.cost = val,
    get: (building) => building.data.cost,
},{
    label: "Time",
    type: "number",
    hint: "How long it takes to build, in months",
    set: (building, val) => building.data.time = val,
    get: (building) => building.data.time,
},{
    label: "Modifier",
    type: "modifier",
    set: (building, val) => building.data.modifier = val,
    get: (building) => building.data.modifier,
},{
    label: "Build trigger",
    type: "trigger",
    set: (building, val) => building.data.build_trigger = val,
    get: (building) => building.data.build_trigger,
},{
    label: "Keep trigger",
    type: "trigger",
    set: (building, val) => building.data.keep_trigger = val,
    get: (building) => building.data.keep_trigger,
},{
    label: "Fort",
    type: "select",
    options: 'yesno',
    set: (building, val) => building.data.influencing_fort = val,
    get: (building) => building.data.influencing_fort,
},{
    label: "On map",
    type: "select",
    options: 'yesno',
    set: (building, val) => building.data.onmap = val,
    get: (building) => building.data.onmap,
},{
    label: "One per country",
    type: "select",
    options: 'yesno',
    set: (building, val) => building.data.one_per_country = val,
    get: (building) => building.data.one_per_country,
},{
    label: "Ai will do",
    type: "aiwilldo",
    set: (building, val) => building.data.ai_will_do = val,
    get: (building) => building.data.ai_will_do,
}];

export {
    buildingForm,
};