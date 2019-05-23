import React, { Component } from 'react';
import Search from './Search';
import TaskSort from './TaskSort';

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search ></Search>
                <TaskSort ></TaskSort>
            </div>
        );
    }
}

export default Control;