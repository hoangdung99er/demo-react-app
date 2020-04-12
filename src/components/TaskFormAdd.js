import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskFormAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      status : true,
    }
  }

  componentDidMount(){
    if(this.props.taskEdit)   
    {
      this.setState({
        id : this.props.taskEdit.id,
        name : this.props.taskEdit.name,
        status : this.props.taskEdit.status
      });
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    
    if(nextProps && nextProps.taskEdit)   
    {
      this.setState({
        id : nextProps.taskEdit.id,
        name : nextProps.taskEdit.name,
        status : nextProps.taskEdit.status
      });
      
    }else if(nextProps.taskEdit === null)
    {     
      this.setState({
        id : '',
        name : '',
        status : true,
      });
    };
  }
  
  onHandleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    if(name === 'status') {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name] : value
    });
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  } 

  onSubmit = (e) => {
    e.preventDefault();
    // this.props.onAddObj(this.state);
    this.props.onAddTask(this.state);
    this.props.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name : '',
      status : true,
    });
    
  }

    render() {
        
        if(!this.props.isActive) return '';
        // do thêm không có id , sửa có id nên sử dụng id để so sánh
        return (
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">              
                  { !this.state.id ? 'Thêm công việc' : 'Cập nhật công việc' } 
                  <span 
                    className="fal fa-times-circle text-right" 
                    onClick = { this.onCloseForm }
                  >

                  </span>
                </h3>
              </div>
              <div className="panel-body">                   
                <form onSubmit = { this.onSubmit }>                    
                  <div className="form-group" >
                    <label>Tên </label>
                    <input 
                      type="text" 
                      className="form-control"
                      value = {this.state.name}
                      name = "name"
                      onChange = { this.onHandleChange }
                      
                    />
                    <br />
                    <label>Trạng Thái </label>                         
                    <select 
                      className="form-control" 
                      value = { this.state.status }
                      name = "status"
                      onChange = { this.onHandleChange }
                    >
                      
                      <option value={ true }>Kích Hoạt</option>
                      <option value={ false }>Ẩn</option>
                    
                    </select>                 
                  </div>
                    <button type="submit" className="btn btn-primary"> 
                      <span className="fa fa-plus mr-5"></span>
                      { !this.state.id ? 'Thêm' : 'Sửa' } 
                    </button>&nbsp;
                    <button type="reset" className="btn btn-danger" onClick = { this.onClear }>
                      <span className="fa fa-window-close mr-5"></span>
                      Hủy bỏ
                    </button>
                </form>                   
              </div>
            </div>
        );       
    }
}

const mapStateToProps =  (state) => {
  return {
    isActive : state.isActive,
    taskEdit : state.editTask,
  }
}

const mapDispatchToProps = (dispatch , props) => {
  return {
    onAddTask : (task) => {
      dispatch(actions.addTask(task));
    },
    onCloseForm : () => {
      dispatch(actions.closeForm())
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task))
    }
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(TaskFormAdd);
