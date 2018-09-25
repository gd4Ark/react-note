/**
 * Created by Administrator on 2018/5/18.
 */


export const utNote = {

    itemById(arr,id,state=true){
        return arr.filter(item=>
            state ? item.id === id : item.id !== id
        );
    },
};
