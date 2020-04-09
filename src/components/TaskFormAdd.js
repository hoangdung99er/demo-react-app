import React, { Component } from 'react';

class TaskFormAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : '',// do taskEdit có thêm thuộc tính ID
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
    }
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
    }    
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

  onHandleClose = () => {
    this.props.isCloseForm();
  } 

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddObj(this.state);
    this.props.onClose()
  }

  onClear = () => {
    this.setState({
      name : '',
      status : true,
    });
  }

    render() {

        // do thêm không có id , sửa có id nên sử dụng id để so sánh
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">              
                  { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' } 
                  <span 
                    className="fal fa-times-circle text-right" 
                    onClick = { this.onHandleClose }
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
                      { id !== '' ? 'Sửa' : 'Thêm' } 
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

export default TaskFormAdd;
