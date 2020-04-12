import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class AddEvent extends Component {

    // onOpenEvent = () => {
    //     this.props.isActiveEvent()
    // }

    onToggleForm = () => {
        // if(this.state.isActive && this.state.taskEdit !== null)
        // {
        //   this.setState({
        //     isActive : true,
        //     taskEdit : null,  
        //   });
        // }else{
        //   this.setState({
        //     isActive : !this.state.isActive,
        //     taskEdit : null,    
        //   });
        // }
        if(this.props.taskEdit && this.props.taskEdit.id !== '')
        {
          this.props.onOpenForm();
        }else{
          this.props.onToggleForm();
        }
        this.props.onClearTask({
          id : '' ,
          name : '',
          status : true,
        });
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button type="reset" className="btn btn-primary" id="btn1" onClick = { this.onToggleForm }>
                    <span className="fa fa-plus mr-5" ></span>
                    Thêm Công Việc
                </button>              
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      taskEdit : state.editTask 
    }
  }

const mapDispatchToProps = (dispatch , props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm())
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    },
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(AddEvent);
