import React, { Component } from 'react';
import RemoveIcon from '../img/remove.png';
class NoteHeader extends Component{
    constructor(props){
        super(props);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    render(){
        const {
            onRemove,
            id,
            title,
        } = this.props;
        return (
            <div className="note-header flex">
                <input
                    type="text"
                    className="note-title"
                    value={title}
                    onChange={this.onUpdateTitle}
                    onBlur={this.onBlur}
                />
                <button
                    onClick={()=>onRemove(id)}
                    className="note-remove-btn small-btn"
                >
                    <img
                        src={ RemoveIcon }
                    />
                </button>
            </div>
        )
    }

    onUpdateTitle(event,str=null){
        let inner_str = str || event.target.value;
        this.props.onUpdateTitle(inner_str);
    }
    onBlur(event){
       let str = event.target.value;
       if (!str){
           str = "空标签名";
       }
       this.onUpdateTitle(event,str);
    }
}

export default NoteHeader;