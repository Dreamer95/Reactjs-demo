import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import * as actions from './actions/index';
import { connect } from 'react-redux';


class App extends Component {
  
  onToggleForm = () => {
    if(this.props.itemEditting.id === ''){
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayTaskForm: true
    })
  }


  render() {
    var {  isDisplayTaskForm } = this.props;

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1> <hr />
        </div>
        <div className={isDisplayTaskForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
          <TaskForm />
        </div>

        <div className={isDisplayTaskForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
            <span className="fa fa-plus"></span> Thêm Công Việc
          </button>

          <Control ></Control>
          <TaskList ></TaskList>

        </div>
      </div>
    );
  }

}

var mapStateToProps = (state) => {
  return {
    isDisplayTaskForm : state.isDisplayForm,
    itemEditting : state.itemEditting    
  }
}

var mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },

    onClearTask : (task) => {
      dispatch(actions.editTask(task))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
