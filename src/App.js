import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ContextMenu from './modules/ContextMenu';
import Note from './modules/Note';
import {defaultAppState} from './config/config.js';
import './css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    const appState = this.getAppState(defaultAppState);
    this.state = {
        ...appState,
      contextMenu : {
          x : 0,
          y : 0,
          display:false,
        },
    };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onShowContextMenu = this.onShowContextMenu.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }
  render() {
    this.save();
    const noteList = this.state.noteList.map(item=>
        <Note
            key={item.id}
            note = {item}
            onRemove = {this.onRemove}
            updateNote = {this.updateNote}
        />
    );
    return (
      <div
          onContextMenu={(event)=>this.onShowContextMenu(event)}
          onClick={(event)=>this.onShowContextMenu(event,true)}
          className="App container">
          <ContextMenu
              ctxMenu = {this.state.contextMenu}
              onAdd = {this.onAdd}
          />
          <ReactCSSTransitionGroup
              component="div"
              className = "note-container"
              transitionName="example"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
          >
              { noteList }
          </ReactCSSTransitionGroup>
      </div>
    );
  }

  getAppState(dafult){
    return (localStorage.appState && JSON.parse(localStorage.appState)) || dafult;
  }

  save(){
    localStorage.appState = JSON.stringify(this.state);
  }

  onAdd(){
    const updatedNoteList = this.state.noteList.concat({
        id : this.state.newestId,
        title : "新建便签"+this.state.newestId,
        newestId : 0,
        list : [],
    });
    this.setState({
        newestId : this.state.newestId+1,
        noteList : updatedNoteList,
    });
  }

  onRemove(id){
      const updatedList = this.state.noteList.filter(item=>
          item.id !== id
      );
      this.setState({
          noteList:updatedList,
      });
  }

  onShowContextMenu(event,state){
    if (!this.state.contextMenu.display && state) return;
    event.preventDefault();
    this.setState({
        contextMenu: {
          x : event.clientX,
          y : event.clientY,
          display : !state,
        }
    });
    return false;
  }

  isUpdateNote(item,index,id){
      const state = item.id === id;
      state && (item.temp_index = index);
      return state;
  }

  updateNote(newNote){
      const newNoteList = this.state.noteList;
      newNoteList
          .filter((item,index)=>
            this.isUpdateNote(item,index,newNote.id)
          )
          .map(item=>
            newNoteList[item.temp_index] = newNote
          );
      this.setState({
          noteList:newNoteList,
      });
  }
}

export default App;
