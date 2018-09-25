import React, { Component } from 'react';
class ContextMenu extends Component{
    render(){
        const {
            x,
            y,
            display,
        } = this.props.ctxMenu;
        return (
            <div
                style = {{
                    top : y+'px',
                    left : x+'px',
                    display : display ? 'block' : 'none',
                }}
                className="context-menu">
                <ul>
                    <li
                        onClick={()=>this.props.onAdd()}
                    >
                        Add
                    </li>
                </ul>
            </div>
        );

    }
}

export default ContextMenu;