import React, { Component } from 'react';


class Sort extends Component {

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     console.log(nextProps);     
    // }

    onClick = (sortBy , sortValue) => {
        this.props.onSort(sortBy , sortValue);     
    }

    render() {
        
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
                            className = { 
                                (this.props.sortBy === 'name' 
                                && this.props.sortValue === 1 
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
                            className = { 
                                (this.props.sortBy === 'name' 
                                && this.props.sortValue === -1
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
                            className = { 
                                (this.props.sortBy === 'status' 
                                && this.props.sortValue === 1
                                ? 'sort_selected' : '') }  
                        >
                            Trạng Thái Kích Hoạt
                        </a>
                      </li>
                      <li onClick = { () => this.onClick('status' , -1) }>
                        <a 
                            role="button"
                            className = { 
                                (this.props.sortBy === 'status' 
                                && this.props.sortValue === -1
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

export default Sort;
