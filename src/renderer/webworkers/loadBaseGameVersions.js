import {baseGameVersions} from '../../shared/file/baseGameData';

onmessage = function(e){
    var {context} = e.data;
    var baseGameVersionsObj = baseGameVersions(context.appFolder).get();
    postMessage({type: "done", data: baseGameVersionsObj});
}