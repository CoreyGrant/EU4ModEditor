import {projectList} from '../../shared/file/appData';

onmessage = function(e){
    var {context} = e.data;
    var projectListObj = projectList(context.appFolder).get();
    postMessage({type: "done", data: projectListObj});
}