import { not } from "ip";

const defaultAppState = (function(){

    const obj = {
        newestId : 0,
        noteList : [],
    };

    var note = {
        id : 0,
        title : '这是一个标签标题（点击可编辑）',
        list : [
            {
                id : 1,
                content : 'todo item 1',
                hasComplete : true,
            },
            {
                id : 2,
                content : 'todo item 2',
                hasComplete : false,
            },
        ],
    }
   
    note.newestId = note.list.length;

    obj.noteList.push(note);

    obj.newestId = obj.noteList.length;

    return obj;

})();


export {
    defaultAppState,
};