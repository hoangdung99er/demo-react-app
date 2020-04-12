import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.tasks.id);
    }

    onDeleteStatus = () => {
        this.props.onDeleteStatus(this.props.tasks.id);
        this.props.onCloseForm();
    }

    onEdit = () => {       
        this.props.onOpenForm();
        this.props.onEditTask(this.props.tasks);        
    }

    render() {

        var { index , tasks } = this.props;
        
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{tasks.name}</td>
                <td>
                    <span className={ tasks.status === true 
                    ?  'label label-success' : 'label label-danger'}
                    onClick = { this.onUpdateStatus } 
                    >
                    
                    { tasks.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    
                    </span>
                </td>
                <td>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick = { this.onEdit }
                    >
                        
                        Sửa                  
                    </button>
                    
                    &nbsp;
                    
                    <button 
                            type="reset" 
                            className="btn btn-danger" 
                            onClick = { this.onDeleteStatus }
                            
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    
    }
}

const mapDispatchToProps = (dispatch , state) => {
    return {
        onDeleteStatus : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onUpdateStatus : (id) => {
            dispatch(actions.updateTask(id))
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(TaskItem);
