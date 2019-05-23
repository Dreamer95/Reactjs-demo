import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDelete = () => {
        this.props.onDeleteTask(this.props.task)
    }
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task)
    }

    render() {
        var { task, index } = this.props;

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true
                        ? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button className="btn btn-warning"
                        type="button"
                        onClick={this.onEditTask}
                    >
                        <span className="fa fa-pencil-alt mr-5"></span> Sửa
                    </button>&nbsp;

                    <button className="btn btn-danger"
                        type="button"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span> Xoá
                    </button>
                </td>
            </tr>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        isDisplayTaskForm: state.isDisplayForm
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        },
        onDeleteTask: (task) => {
            dispatch(actions.deleteTask(task))
        },
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);