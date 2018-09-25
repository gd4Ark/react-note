import React, { Component } from 'react';
import AddIcon from '../img/add.png';
class NoteFooter extends Component{
    constructor(props){
        super(props);
        this.state = {
            content : '',
        };
        this.onAdd = this.onAdd.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render(){
        return (
            <div className="note-footer">
                <div className="note-footer-add-box container flex">
                    <input
                        type="text"
                        ref="input"
                        autoFocus
                        value={this.state.content}
                        onChange={this.onContentChange}
                        onKeyDown={this.onSubmit}
                        className="note-footer-input"
                        placeholder="新任务"
                    />
                    <button
                        className="note-footer-add-btn small-btn"
                        onClick={ ()=>this.onAdd() }
                    >
                        <img
                            src={AddIcon}
                        />
                    </button>
                </div>
            </div>
        )
    }

    onAdd(){
        const domInput = this.refs.input;
        const {content} = this.state;
        domInput.focus();
        if (!content) return;
        this.props.onAdd(content);
        this.setState({
            content : '',
        });
    }

    onContentChange(event){
        this.setState({
            content : event.target.value,
        });
    }

    onSubmit(event){
        if (event.keyCode===13){
            this.onAdd();
        }
    }
}

export default NoteFooter;