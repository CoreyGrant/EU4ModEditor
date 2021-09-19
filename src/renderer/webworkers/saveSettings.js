import {appSettings} from '../../shared/file/appData';

onmessage = function(e){
    var {context, payload} = e.data;
    appSettings(context.appFolder).set(payload);
    postMessage({type: "done"});
}