import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  componentWillMount() {
    if (this.props.taskEdit) {
      this.setState({
        id: this.props.taskEdit.id,
        name: this.props.taskEdit.name,
        status: this.props.taskEdit.status
      })
    } else {
      this.onClear();
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops && nextprops.taskEdit) {
      this.setState({
        id: nextprops.taskEdit.id,
        name: nextprops.taskEdit.name,
        status: nextprops.taskEdit.status
      })
    } else {
      this.onClear();
    }    
        
  }

  

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === 'status') {
      value = target.value === 'true' ? true : false
    }
    this.setState({
      [name]: value
    })

  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.name !== '') {
      // this.props.taskSubmit(this.state); goi props ngoai appjs
      this.props.onSaveTask(this.state) // goi props tu store
    }
    this.onClear();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  onCloseTaskForm = () => {
    this.props.onCloseTaskForm();
  }


  render() {
    var { id } = this.state;
    if (this.props.isDisplayTaskForm === false) {return ''};
      return (
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title" >
              {id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
              <span className="fa fa-times-circle text-right"
                onClick={this.onCloseTaskForm}
              ></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label >Tên : </label>
                <input type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange} />
              </div>
              <label>Trạng Thái : </label>
              <select className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select><br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  <span className="fa fa-plus mr-5"></span> Lưu Lại
                                  </button>&nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onClear}>
                  <span className="fa fa-times mr-5"></span> Huỷ Bỏ
                </button>
              </div><hr />
              <div className="text-center myRed" > {this.state.name === '' ? "Name is not empty" : ""} </div>
            </form>
          </div>
        </div>
      );
    
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayTaskForm: state.isDisplayForm,
    taskEdit : state.itemEditting
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task))
    },
    onCloseTaskForm: () => {
      dispatch(actions.closeForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);