export class Project{
    constructor(name, baseFilePath, exportObj, common, history, events, images){
        this.name = name;
        this.baseFilePath = baseFilePath;
        this.export = exportObj || new ProjectExport();
        this.common = common;
        this.history = history;
        this.events = events;
        this.images = images;
    }

    name;
    baseFilePath;
    export;

    common;
    history;
    events;

    images;
}

export class ProjectCommon{ 
    advisorTypes;
    ages;
    aiArmy;
    aiAttitudes;
    aiPersonalities;
    ancestorPersonalities;
    bookmarks;
    buildings;
    cbTypes;
    centersOfTrade;
    churchAspects;
    clientStates;
    colonialRegions;
    countries;
    countryColors;
    countryTags;
    cultures;
    customCountryColors;
    customIdeas;
    decrees;
    defenderOfFaith;
    // lua scripts, not sure
    defines;
    diplomaticActions;
    disasters;
    dynastyColors;
    estateAgendas;
    estateCrownLand;
    estatePrivileges;
    estates;
    estatesPreload;
    eventModifiers;
    factions;
    federationAdvancements;
    fervor;
    fetishistCults;
    flagshipModifications;
    goldenBulls;
    governmentNames;
    governmentRanks;
    governmentReforms;
    governments;
    greatProjects;
    hegemons;
    holyOrders;
    ideas;
    imperialIncidents;
    incidents;
    institutions;
    insults;
    isolationism;
    leaderPersonalities;
    mercenaryCompanies;
    natives;
    navalDoctrines;
    newDiplomaticActions;
    onActions;
    opinionModifiers;
    parliamentBribes;
    parliamentIssues;
    peaceTreaties;
    personalDeities;
    policies;
    powerProjection;
    prices;
    professionalism;
    provinceNames;
    provinceTriggeredModifiers;
    rebelTypes;
    regionColors;
    religions;
    religiousConversions;
    religiousReforms;
    revoltTrigger;
    revolution;
    rulerPersonalities;
    scriptedEffects;
    scriptedFunctions;
    scriptedTriggers;
    stateEdicts;
    staticModifiers;
    subjectTypeUpgrades;
    subjectTypes;
    technologies;
    timedModifiers;
    tradeCompanies;
    tradeCompanyInvestments;
    tradeGoods;
    tradeNodes;
    tradingPolicies;
    triggeredModifiers;
    units;
    unitsDisplay;
    wargoalTypes;
}

export class ProjectHistory{
    advisors;
    countries;
    diplomacy;
    provinces;
    wars;
}

export class ProjectObject{
    data;
    name;
    id;
}

export class ProjectObjectFlat extends ProjectObject{
    flat = true;
    fileName;
}

export class ProjectExport{
    basePath;
    objectExports;
}

export class ProjectObjectExport{
    id;
    relativePath;
}


export class ProjectFolder{
    constructor(name, folders, files, fullPath){
        this.name = name;
        this.folders = folders;
        this.files = files;
        this.fullPath = fullPath;
    }
    name;
    folders;
    files;
    fullPath;
}

export class ProjectFile{
    constructor(name, data, type, fullPath){
        this.name = name;
        this.data = data;
        this.type = type;
        this.fullPath = fullPath;
    }
    // euObj = 0, yml = 1, tga = 2, dds = 3
    type;
    name;
    data;
    fullPath;
    // used for files where we copy rather than parse
    localPath;
    id;
}
