import Vue from 'vue'

var advisorNonBonusKeys = ["monarch_power", "skill_scaled_modifier", "chance", "ai_will_do"];
var advisorForm = [{
    label: "Name",
    type: "text",
    set: (advisor, val) => advisor.name = val,
    get: (advisor) => advisor.name,
    validators: ["euProp"],
    mask: ["euProp"],
    required: true
},{
    label: "Monarch power",
    type: "select",
    set: (advisor, val) => advisor.data.monarch_power = val,
    get: (advisor) => advisor.data.monarch_power,
    options: "monarchPower",
    required: true
},{
    label: "Bonus",
    type: "bonus",
    required: true,
    set: (advisor, val) => {
        var newBonusKeys = Object.keys(val.data);
        var advisorKeys = Object.keys(advisor);
        var advisorBonusKeys = advisorKeys.filter(x => advisorNonBonusKeys.indexOf(x) === -1);
        for(var i = 0; i< advisorBonusKeys.length; i++){
            var abk = advisorBonusKeys[i];
            if(newBonusKeys.indexOf(abk) === -1){
                delete advisor[abk];
            }
        }
        for(var i = 0; i < newBonusKeys.length; i++){
            var nbk = newBonusKeys[i];
            Vue.set(advisor, nbk, val.data[nbk]);
        }
    },
    get: (advisor) => {
        var advisorKeys = Object.keys(advisor.data);
        var advisorBonusKeys = advisorKeys.filter(x => advisorNonBonusKeys.indexOf(x) === -1);
        console.log(advisorBonusKeys);
        var outputObj = {};
        for(var i = 0; i < advisorBonusKeys.length; i++){
            var abk = advisorBonusKeys[i];
            outputObj[abk] = advisor.data[abk];
        }
        return outputObj;
    }
},
{
    label: "Meritocracy",
    type: "number",
    step: 0.25,
    set: (advisor, val) => advisor.data.skill_scaled_modifier.meritocracy = val,
    get: (advisor) => advisor.data.skill_scaled_modifier.meritocracy,
    required: true,
    default: 0.25
},{
    label: "Chance factor",
    type: "number",
    default: 1,
    set: (advisor, val) => advisor.data.chance.factor = val,
    get: (advisor) => advisor.data.chance.factor,
},{
    label: "AI will do",
    type: "form",
    form: "aiWillDo",
    set: (advisor, val) => advisor.data.ai_will_do = val,
    get: (advisor) => advisor.data.ai_will_do,
}];

var advisorHistoryForm = [{
    label: "Advisor id",
    type: "number",
    step: 1,
    set: (ah, val) => ah.data.advisor_id = val,
    get: (ah) => ah.data.advisor_id,
    readonly: true
},{
    label: "Name",
    type: "text",
    quoted: true,
    set: (ah, val) => ah.data.name = val,
    get: (ah) => ah.data.name
},{
    label: "Location",
    type: "number",
    quoted: true,
    set: (ah, val) => ah.data.location = val,
    get: (ah) => ah.data.location
},{
    label: "Discount",
    type: "select",
    options: "yesno",
    set: (ah, val) => ah.data.discount = val,
    get: (ah) => ah.data.discount
},{
    label: "Skill",
    type: "select",
    options: "advisorSkill",
    set: (ah, val) => ah.data.skill = val,
    get: (ah) => ah.data.skill
},{
    label: "Type",
    type: "select",
    options: (state) => {
        return state.project.common.advisorTypes.map(x => x.name);
    },
    set: (ah, val) => ah.data.type = val,
    get: (ah) => ah.data.type
},
{
    label: "Date",
    type: "date",
    set: (ah, val) => ah.data.date = val,
    get: (ah) => ah.data.date,
    default: '1399.1.1'
},
{
    label: "Death date",
    type: "date",
    set: (ah, val) => ah.data.death_date = val,
    get: (ah) => ah.data.death_date,
    default: '1399.1.1'
}];

export {
    advisorForm,
    advisorHistoryForm,
};