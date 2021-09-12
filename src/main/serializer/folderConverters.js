import { v4 as guid } from 'uuid';
import { 
    ProjectObject,
    ProjectCommon,
    ProjectHistory,
    ProjectObjectExport,
    ProjectObjectFlat, 
    ProjectExport
} from '../../models/project';

// defaults to just using same name
const commonMappings = {
    "advisortypes": "advisorTypes",
    "ai_army": "aiArmy",
    "ai_attitudes": "aiArmy",
    "ai_personalities": "aiPersonalities",
    "ancestor_personalities": "ancestorPersonalities",
    "cb_types": "cbTypes",
    "centers_of_trade": "centersOfTrade" ,
    "church_aspects": "churchAspects" ,
    "client_states": "clientStates",
    "colonial_regions": "colonialRegions",
    "country_colors": "countryColors",
    "country_tags": "countryTags",
    "custom_country_colors": "customCountryColors",
    "custom_ideas": "customIdeas" ,
    "defender_of_faith": "defenderOfFaith",
    "diplomatic_actions": "diplomaticActions",
    "dynasty_colors" : "dynastyColors",
    "estate_agendas" : "estateAgendas",
    "estate_crown_land" : "estateCrownLand",
    "estate_privileges" : "estatePrivileges",
    "estates_preload": "estatesPreload",
    "event_modifiers": "eventModifiers",
    "federation_advancements": "federationAdvancements",
    "fetishish_cults": "fetishistCults",
    "flagship_modifications": "flagshipModifications",
    "golden_bulls": "goldenBulls",
    "government_names": "governmentNames",
    "government_ranks": "governmentRanks",
    "government_reforms": "governmentReforms",
    "great_projects": "greatProjects",
    "holy_orders": "holyOrders",
    "imperial_incidents": "imperialIncidents",
    "leader_personalities": "leaderPersonalities",
    "mercenary_companies": "mercenaryCompanies",
    "naval_doctrines": "navalDoctrines",
    "new_diplomatic_actions": "newDiplomaticActions",
    "on_actions": "onActions",
    "opinion_modifiers": "opinionModifiers",
    "parliament_bribes": "parliamentBribes",
    "parliament_issues": "parliamentIssues",
    "peace_treaties": "peaceTreaties",
    "personal_deities": "personalDeities",
    "powerprojection": "powerProjection",
    "province_names": "provinceNames",
    "province_triggered_modifiers": "provinceTriggeredModifiers",
    "rebel_modifiers": "rebelModifiers",
    "religion_colors": "religionColors",
    "religious_conversions": "religionConversions",
    "religious_reforms": "religiousReforms",
    "revolt_triggers": "revoltTriggers",
    "ruler_personalities": "rulerPersonalities",
    "scripted_effects": "scriptedEffects",
    "scripted_functions": "scriptedFunctions",
    "scripted_triggers": "scriptedTriggers",
    "state_edicts": "stateEdicts",
    "static_modifiers": "staticModifiers",
    "subject_type_upgrades": "subjectTypeUpgrades",
    "subject_types": "subjectTypes",
    "timed_modifiers": "timedModifiers",
    "trade_companies": "tradeCompanies",
    "tradecompany_investments": "tradeCompanyInvestments",
    "tradegoods": "tradeGoods",
    "trading_policies": "tradingPolicies",
    "triggered_modifiers": "triggeredModifiers",
    "units_display": "unitsDisplay",
    "wargoal_types": "wargoalTypes",
};

const commonFlatFileMappings = {
    "aiArmy": true,
    "bookmarks": true,
    "countries": true,
    "technologies": true
}

const historyFlatFileMappings = {
    "countries": true,
    "provinces": true,
    "wars": true,
}

// Returns both a list of ProjectObjectExport objects, and a ProjectCommon
function convertCommonFolder(folder){
    var exports = [];
    var projectCommon = new ProjectCommon();
    for(var i = 0; i < folder.folders.length; i++){
        var subFolder = folder.folders[i];
        var prop = subFolder.name;
        if(commonMappings[prop]){
            prop = commonMappings[prop];
        }
        // For each file in the folder, read all the properties as objects by default
        var flat = !!commonFlatFileMappings[prop];
        var objects = [];
        for(var j = 0; j < subFolder.files.length; j++){
            var file = subFolder.files[j];
            var fileName = file.name;
            var fileData = file.data;
            if(flat){
                var id = guid();
                var projObj = new ProjectObjectFlat();
                projObj.data = fileData;
                projObj.id = id;
                projObj.name = fileName;
                projObj.fileName = fileName;
                var projObjExport = new ProjectObjectExport();
                projObjExport.id = id;
                projObjExport.relativePath = "common/" + prop + "/" + fileName;
            } else{
                var fileDataKeys = Object.keys(fileData);
                for(var k = 0; k < fileDataKeys.length; k++){
                    var key = fileDataKeys[k];
                    var obj = fileData[key];
                    var id = guid();
                    var projObj = new ProjectObject();
                    projObj.name = key;
                    projObj.data = obj;
                    projObj.id = id;
                    var projObjExport = new ProjectObjectExport();
                    projObjExport.id = id;
                    projObjExport.relativePath = "common/" + prop + "/" + fileName;
                    exports.push(projObjExport);
                    objects.push(projObj);
                }
            }
        }
        projectCommon[prop] = objects;
    }
    return [projectCommon, exports]
}

function convertHistoryFolder(folder){
    var exports = [];
    var projectCommon = new ProjectCommon();
    for(var i = 0; i < folder.folders.length; i++){
        var subFolder = folder.folders[i];
        var prop = subFolder.name;
        // For each file in the folder, read all the properties as objects by default
        var flat = !!historyFlatFileMappings[prop];
        var objects = [];
        for(var j = 0; j < subFolder.files.length; j++){
            var file = subFolder.files[j];
            var fileName = file.name;
            var fileData = file.data;
            if(flat){
                var id = guid();
                var projObj = new ProjectObjectFlat();
                projObj.data = fileData;
                projObj.id = id;
                projObj.name = key;
                projObj.fileName = fileName;
                var projObjExport = new ProjectObjectExport();
                projObjExport.id = id;
                projObjExport.relativePath = "history/" + prop + "/" + fileName;
            } else{
                var fileDataKeys = Object.keys(fileData);
                for(var k = 0; k < fileDataKeys.length; k++){
                    var key = fileDataKeys[k];
                    var obj = fileData[key];
                    var id = guid();
                    var projObj = new ProjectObject();
                    projObj.data = obj;
                    projObj.id = id;
                    var projObjExport = new ProjectObjectExport();
                    projObjExport.id = id;
                    projObjExport.relativePath = "history/" + prop + "/" + fileName;
                    exports.push(projObjExport);
                    objects.push(projObj);
                }
            }
        }
        projectCommon[prop] = objects;
    }
    return [projectCommon, exports]
}

function convertEventsFolder(folder){
    var exports = [];
    var events = [];
    for(var i = 0; i < folder.files.length; i++){
        var file = folder.files[i];
        // For each file in the folder, read all the properties as objects by default
        var id = guid();
        var obj = new ProjectObjectFlat();
        obj.data = file.data;
        obj.id = id;
        obj.fileName = file.name;
        var exp = new ProjectObjectExport();
        exp.id = id;
        exp.relativePath = "events/" + file.name;
        exports.push(exp);
        events.push(obj);
    }
    return [events, exports]
}

export {
    convertCommonFolder,
    convertHistoryFolder,
    convertEventsFolder
}