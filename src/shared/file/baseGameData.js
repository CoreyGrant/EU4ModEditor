import fs from 'fs';
import path from 'path';

var baseGame = (folderName) => ({
    get: (version) => {
        const baseGameFolderName = path.join(folderName, "baseGame");
        if(version.indexOf(".") > -1){
            version = version.replace(/\./g, ",");
        }
        var fileName = path.join(baseGameFolderName, version + ".json");
        return JSON.parse(fs.readFileSync(fileName));
    },
    set: (version, a) => {
        const baseGameFolderName = path.join(folderName, "baseGame");
        if(version.indexOf(".") > -1){
            version = version.replace(/\./g, ",");
        }
        var fileName = path.join(baseGameFolderName, version + ".json");
        fs.writeFileSync(fileName, JSON.stringify(a));
    }
});

var baseGameVersions = (folderName) => ({
    get: () => {
        const baseGameFolderName = path.join(folderName, "baseGame");
        return fs.readdirSync(baseGameFolderName)
            .map(x => path.basename(x).replace(/\,/g, ".").replace(".json", ""));
    }
})

export{
    baseGame,
    baseGameVersions
}