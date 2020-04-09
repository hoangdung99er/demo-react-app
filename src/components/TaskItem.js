import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.tasks.id);
    }

    onDeleteStatus = () => {
        this.props.onDeleteStatus(this.props.tasks.id);
    }

    onClose = () => {
        this.props.onClose();
    }

    onEdit = () => {
        this.props.onEdit(this.props.tasks.id);
    }

    render() {

        var { tasks , index } = this.props;
        
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

export default TaskItem;
