import React, { Component } from 'react';
import RemoveIcon from '../img/remove.png';
class NoteItem extends Component{
    constructor(props){
        super(props);
        this.onChangeComplete = this.onChangeComplete.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }
    render(){
        return (
            <li className="note-list-item flex">
                <input
                    type="checkbox"
                    id = {"checkbox-"+this.props.parentId +'-'+this.props.id}
                    checked={this.props.hasComplete}
                    onChange={this.onChangeComplete}
                    className="note-list-item-select"
                />
                <label
                    htmlFor={"checkbox-"+this.props.parentId +'-'+this.props.id}>
                </label>
                <input
                    type="text"
                    className={
                        `note-list-item-content
                        ${this.props.hasComplete ? 'complete' : ''}`
                    }
                    value={this.props.content}
                    onChange={this.onChangeContent}
                    onBlur={this.onChangeContent}
                />
                <button
                    onClick={()=>this.props.onRemove(this.props.id)}
                    className="note-list-item-remove-btn small-btn">
                    <img
                        src={ RemoveIcon }
                    />
                </button>
            </li>
        )
    }

    onChangeComplete(event){
        this.testProps = this.props;
        this.props.onComplete(this.props.id,event.target.checked);
    }

    onChangeContent(event){
        this.props.onChangeContent(this.props.id,event.target.value);
    }
}

export default NoteItem;