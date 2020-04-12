import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component { 

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        // this.props.onFilter(
        //     name === 'filterName' ? value : this.state.filterName,
        //     name === 'filterStatus' ? value : this.state.filterStatus
        // )

        var filterTable = this.props.filterTable;

        var filter = {
            filterName : name === 'filterName' ? value : filterTable.filterName,
            filterStatus : name === 'filterStatus' ? value : filterTable.filterStatus
        }
        
        
        this.props.onFilter( filter )
        this.setState({
            [name] : value,
        });
    }

    render() {
        
        var { tasks , filterTable , keyword , sort } = this.props;
        
        // console.log(filterTable.filterName); 

        // console.log(keyword);

        // console.log(sort);

        if(sort.sortName === 'name')
        {
            tasks.sort((a , b) => {
                if(a.name > b.name) return sort.sortValue;
                else if (a.name < b.name) return -sort.sortValue;
                else return 0;
            });
        }else
        {
            tasks.sort((a , b) => {
                if(a.status > b.status) return -sort.sortValue;
                else if (a.status < b.status) return +sort.sortValue;
                else return 0;
            });
        }

        if(keyword)
        {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        }

        if(filterTable.filterName)
        {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filterTable.filterName.toLowerCase()) !== -1
        });
        
        }
        // !== null , !== undifined , !==
        tasks = tasks.filter(task => {
            if(filterTable.filterStatus === -1){
                return task;
            }else{
                return task.status === (filterTable.filterStatus !== 0 ? true : false)    
            }
        });

        var element =  tasks.map((task , index) => {         
            return <TaskItem   
            key = { task.id }
            index = { index } 
            tasks = { task } 
                 
        />
        }) 
        
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">                  
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name = "filterName"
                                    value = { filterTable.filterName }
                                    onChange = { this.onChange }
                                />
                                
                            </td>
                            <td>
                                <select 
                                    className="form-control" 
                                    name = "filterStatus"
                                    value = { filterTable.filterStatus }
                                    onChange = { this.onChange }
                                >
                                    <option value={1}>Kích Hoạt</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={-1}>Tất cả</option>
                                </select>
                            </td>

                            <td></td>
                            
                        </tr>
                        
                        { element }
                    
                    </tbody>
                </table>      
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        tasks : state.tasks,
        filterTable : state.filterTask,
        keyword : state.searchTask,
        sort : state.sortTask,
    }
};

const mapDispatchToProps = (dispatch , state) => {
    return {
        onFilter : (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(TaskList);
