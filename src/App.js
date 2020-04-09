import React, { Component } from 'react';
import './App.css';
import TaskFormAdd from './components/TaskFormAdd';
import TaskList from './components/TaskList';
import SearchnSort from './components/SearchnSort';
import AddEvent from './components/AddEvent';
import _ from 'lodash';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isActive : false,
      taskEdit : null,
      filter : {
        name : '',
        status : -1,
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1,
    }
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    this.setState({
      tasks : tasks
    });
  }

  onToggle = () => {
    if(this.state.isActive && this.state.taskEdit !== null)
    {
      this.setState({
        isActive : true,
        taskEdit : null,  
      });
    }else{
      this.setState({
        isActive : !this.state.isActive,
        taskEdit : null,    
      });
    }
    
  }

  onClose = () => {
    this.setState({
      isActive : false,
    });
  }

  onShowForm = () => {
    this.setState({
      isActive : true,
    });
  }

  onAdd = (data) => {
    var { tasks } = this.state;
    // Kiểm tra 
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks,
      taskEdit : null,
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  // Data = () => {
  //     var task = [
  //       {
  //         id : this.generate(),
  //         name : 'Học lập trình',
  //         status : false,
  //       },
  //       {
  //         id : this.generate(),
  //         name : 'Đi bơi',
  //         status : true,
  //       },
  //       {
  //         id : this.generate(),
  //         name : 'Học',
  //         status : true,
  //       },
  //     ];
  //     // khi bấm vào button 'Generate Data' thì sẽ thực hiện công việc lưu vào state
  //     this.setState({
  //       tasks : task,
  //     }); 
  //     localStorage.setItem('tasks', JSON.stringify(task))  // localStorage nên chuyển dữ liệu lưu trữ thành String thay vì Object => Sử dụng JSON
  //   }

  s4() {
    return Math.random().toString(36).substring(7);
  }

  generateID(){
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onUpdateStatus = (id) => {
    console.log(id);
    const { tasks } = this.state;
    const elmtTask = tasks.map(task => {
      if(task.id === id){
        task.status = !task.status;
      }
      return task;
    })
    this.setState({
      tasks : elmtTask
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  findIndex = (id) => {
     // lấy ds các tasks
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task , index) => {
      if(task.id === id){
        result = index;
      }
    });
      return result;    
  }

  onDeleteStatus = (id) => {
    console.log(id);
    const { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks , (task) => {
      return task.id === id
    });
    if(index !== -1){
      tasks.splice(index , 1);
      this.setState({
        tasks : tasks
      });     
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.onClose();
  }

  onEdit = (id) => {
    const { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEdit = tasks[index];
    this.setState({
      taskEdit : taskEdit,
    });
    this.onShowForm();
  }

  onFilter = (filterName , filterStatus) => {
    console.log(filterName + '-' + filterStatus);
    filterStatus = +filterStatus;
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus,
      }
    })
  }

  onSearch = (keyword) => {
    console.log(keyword);
    this.setState ({
      keyword : keyword.toLowerCase()
    })
  }

  onSort =async (sortBy , sortValue) => {   
    await this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
    console.log(this.state.sortBy , '-' , this.state.sortValue);    
  }
  
  render() {

    var { 
        tasks , 
        isActive , 
        taskEdit , 
        filter , 
        keyword , 
        sortBy, 
        sortValue 
      } 
      = this.state;   

    if(filter.name)
    {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(filter.name) !== -1
      });
    }
    // !== null , !== undifined , !== 0
    tasks = tasks.filter(task => {
      if(filter.status === -1){
        return task;
      }else{
          return task.status === (filter.status !== 0 ? true : false)    
      }
    });

    if(keyword)
    {
      // tasks = tasks.filter(task => {
      //   if(task.name.toLowerCase().indexOf(keyword) !== -1)
      //   {
      //     return task;
      //   }
      // });
      // console.log(tasks);
      tasks = _.filter(tasks , (task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      })   
    }

    if(sortBy === 'name'){
      tasks.sort((a , b) => {
        if(a.name > b.name) return sortValue
        else if (a.name < b.name ) return -sortValue;
        else return 0;
      });
    }else{
      tasks.sort((a , b) => {
        if(a.status > b.status) return -sortValue
        else if (a.status < b.status ) return sortValue;
        else return 0;
      });
    }
    
    var elmTask = isActive ? <TaskFormAdd 
                isCloseForm = { this.onClose } 
                onAddObj = { this.onAdd } 
                onClose = {this.onClose}
                taskEdit = { taskEdit }
                /> : '';
    
    return (

      <div className="App">
        <div className="container">
          <div className="row">
            <div className="text-center"><h1>QUẢN LÝ DỰ ÁN</h1></div>
            <hr/>
            <div className = { isActive ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
              
              { elmTask }
              
            </div>
            <div className= { isActive ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' 
                                      : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <AddEvent isActiveEvent = { this.onToggle } />
                
                <div className="row mb-15">
                  <SearchnSort 
                      onSearch = { this.onSearch }
                      onSort = { this.onSort }
                      sortBy = { sortBy }
                      sortValue = { sortValue }
                  />  
                </div>
                
                <div className="row">
                  <TaskList 
                      tasks = { tasks } 
                      onUpdateStatus = { this.onUpdateStatus } 
                      onDeleteStatus = { this.onDeleteStatus }
                      onEdit = { this.onEdit }
                      onFilter = { this.onFilter }
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
  
}

export default App;
