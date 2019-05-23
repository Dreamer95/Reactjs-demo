import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all - 1 active - 0 hide
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onFilter({ // truyen vao 1 obj
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        })
        this.setState({
            [name]: value
        })
    }


    render() {
        //todos la prop lay tu store
        var { todos, filterTable, keyword, sort } = this.props;
        var { filterName, filterStatus } = this.state;
        
        if (filterTable) {
            if (filterTable.name) {
                todos = todos.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1
              })
            }
            todos = todos.filter((task) => {
              if (filterTable.status === -1) {
                return task;
              } else {
                return task.status === (filterTable.status === 1 ? true : false);
              }
            })
          }

        if(keyword){
            todos = todos.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }
           
         
        
        if(sort.by === 'name'){
            todos.sort((a,b)=>{
            if(a.name > b.name) return sort.value
            else if (a.name < b.name) return -sort.value
            else return 0
          })
        }else{
            todos.sort((a,b)=>{
            if(a.status > b.status) return -sort.value
            else if (a.status < b.status) return sort.value
            else return 0
          })
        }

        var elmTasks = todos.map((task, index) => {
            return <TaskItem key={task.id}
                             index={index}
                             task={task}
            >
            </TaskItem>
        })

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={filterName}
                                        onChange={this.onChange}
                                    ></input>
                                </td>
                                <td>
                                    <select className="form-control"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>Tất cả</option>
                                        <option value={1}>Kích hoạt</option>
                                        <option value={0}>Ẩn</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        todos : state.tasks,
        filterTable : state.filterTable,
        keyword : state.searchTable,
        sort : state.sortTable
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter : (filter) => {
            dispatch(actions.filterTable(filter))
        }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);