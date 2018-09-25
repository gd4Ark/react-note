import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {utNote} from '../utils/util';
import NoteHeader from './NoteHeader';
import NoteFooter from './NoteFooter';
import NoteItem from './NoteItem';
class Note extends Component{
    constructor(props){
        super(props);
        this.initOnEvent();
    }

    getList(){
        return this.note.list;
    }

    updateNewestId(){
        console.log(this.note);
        this.note.newestId++;
    }

    initOnEvent(){
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }

    render(){
       const note = this.note = this.props.note;
       const onRemove = this.props.onRemove;
       const list = note.list.map((item)=>
            <NoteItem
                key = {item.id}
                id = {item.id}
                parentId = {note.id}
                content={item.content}
                hasComplete={item.hasComplete}
                onRemove = {this.onRemove}
                onChangeContent={this.onChangeContent}
                onComplete = {this.onComplete}
            />);

        return (
            <div className="note-box">
                <NoteHeader
                    id = {note.id}
                    title = {note.title}
                    onRemove = {onRemove}
                    onUpdateTitle = {this.onUpdateTitle}
                />
                <div className="note-body">
                    <ul className="note-list-group">
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {list}
                        </ReactCSSTransitionGroup>
                    </ul>
                </div>
                <NoteFooter
                    onAdd = {this.onAdd}
                />
            </div>
        )
    }

    updateItem(list=null){
        const updateNote = list ? {
            ...this.note,
            list,
        } : {
            ...this.note,
        };
        this.props.updateNote(updateNote);
    }

    onAdd(content){
        this.updateNewestId();
        const {list,newestId:itemId} = this.note;
        list.push({
            id : itemId,
            content,
            hasComplete:false,
        });

        this.updateItem(list);
    }

    onRemove(id){
        const list = utNote.itemById(this.getList(),id,false);
        this.updateItem(list);
    }

    onUpdateTitle(title){
        this.note.title = title;
        this.updateItem();
    }

    onComplete(id,state){
        const list =  this.getList();
        utNote.itemById(list,id)
            .map(item=>
                item.hasComplete=state
            );

        this.updateItem(list);
    }

    onChangeContent(id,content){

        const list =  this.getList();

        utNote.itemById(list,id)
            .map(item=>
                item.content=content
            );

        this.updateItem(list);
    }

}

export default Note;