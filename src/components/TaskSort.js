import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSort extends Component {
   

    onClick(sortBy,sortValue){
            
            this.props.onSort({
                by : sortBy,
                value : sortValue
            });
    }
    

    render() {
        var {giveSort} = this.props;
        
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sắp Xếp <span className="fa fa-caret-square-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a role="button" > 
                                <span className="fa fa-sort-alpha-down mr-5" />
                                Tên A-Z
                                <span className={(giveSort.by==='name'&&giveSort.value===1)?"fas fa-check ml-5":""} />
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a role="button" > 
                                <span className="fa fa-sort-alpha-up mr-5" />
                                Tên Z-A
                                <span className={(giveSort.by==='name'&&giveSort.value===-1)?"fas fa-check ml-5":""} />
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a role="button" > Trạng thái kích hoạt
                            <span className={(giveSort.by==='status'&&giveSort.value===1)?"fas fa-check ml-5":""} />
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a role="button" > Trạng thái ẩn
                            <span className={(giveSort.by==='status'&&giveSort.value===-1)?"fas fa-check ml-5":""} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
    return {
        giveSort : state.sortTable
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSort : (sort) => {
            dispatch(actions.sortTable(sort))
        }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(TaskSort);