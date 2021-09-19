import {baseGame} from '../../shared/file/baseGameData';

onmessage = function(e){
    var {context, payload: {version}} = e.data;
    postMessage({type: "done", data: baseGame(context.appFolder).get(version)});
}