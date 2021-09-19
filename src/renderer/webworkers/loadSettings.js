import {appSettings} from '../../shared/file/appData';

onmessage = function(e){
    var {context} = e.data;
    var appSettingsObj = appSettings(context.appFolder).get();
    postMessage({type: "done", data: appSettingsObj});
}