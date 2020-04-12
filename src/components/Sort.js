import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Sort extends Component {

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     console.log(nextProps);     
    // }

    onClick = (sortBy , sortValue) => {
        // this.props.onSort(sortBy , sortValue);
        this.props.onSort({
            sortName : sortBy,
            sortValue : sortValue
        });
    }

    render() {

        var { sort } = this.props;
        
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="dropdown">
                      <button 
                          type="button" 
                          className="btn btn-primary dropdown-toggle" id="dropdownMenu1" 
                          data-toggle="dropdown" 
                          aria-haspopup="true"
                          aria-expanded="true"
                      >
                      
                      Sắp Xếp
                      
                      <span className="fas fa-caret-down ml-5"></span>
                      </button>
                      <ul 
                          className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenu1"
                      >
                      <li onClick = { () => this.onClick('name' , 1) }>
                        <a 
                            role="button"
                            href = "#sortAZ"
                            className = { 
                                (sort.sortName === 'name' 
                                && sort.sortValue === 1 
                                ? 'sort_selected' : '') }                  
                        >
                            <span className="fa fa-sort-alpha-asc pr-5">
                              Tên A-Z
                            </span>
                        </a>
                      </li>
                      <li onClick = { () => this.onClick('name' , -1) }>
                        <a 
                            role="button" 
                            href = "#sortZA"
                            className = { 
                                (sort.sortName === 'name' 
                                && sort.sortValue === -1
                                ? 'sort_selected' : '') }
                        >
                          <span className="fa fa-sort-asc pr-5">Tên Z-A</span>
                        </a>
                      </li>
                      <li role="separator" className = "divider">

                      </li>
                      <li onClick = { () => this.onClick('status' , 1) }>
                        <a 
                            role="button"
                            href = "#sortTrue"
                            className = { 
                                (sort.sortName === 'status' 
                                && sort.sortValue === 1
                                ? 'sort_selected' : '') }  
                        >
                            Trạng Thái Kích Hoạt
                        </a>
                      </li>
                      <li onClick = { () => this.onClick('status' , -1) }>
                        <a 
                            role="button"
                            href = "#sortFalse"
                            className = { 
                                (sort.sortName === 'status' 
                                && sort.sortValue === -1
                                ? 'sort_selected' : '') }                      
                        >
                            Trạng Thái Ẩn
                        </a>
                      </li>
                      </ul>
                  </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort : state.sortTask
    }
}

const mapDispatchToProps = (dispatch , state) => {
    return {
        onSort : (sort) => {
            dispatch(actions.sortTask(sort))
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Sort);
