import React from 'react';
import './MyForm.css'

class Edit extends React.Component {
    constructor(props){
      super(props)
      this.state = { 
            taskid:'',
            username:'',
            taskdate:'',
            tasktime:'',
            taskname:''
           }
    }
    componentDidMount(){
      let _taskid = '';
      let _taskname='';
      let _username='';
      let _taskdate='';
      let _tasktime='';
      if (localStorage) {
            _taskid = JSON.parse(localStorage.getItem('taskid'))
            _username = JSON.parse(localStorage.getItem('username'));
            _tasktime = JSON.parse(localStorage.getItem('tasktime'));
            _taskname = JSON.parse(localStorage.getItem('taskname'))
            _taskdate = JSON.parse(localStorage.getItem('taskdate'))
            console.log(_taskid,_taskname,_tasktime,_taskdate,_username)
      }
      this.setState({username:_username,taskid:_taskid,taskname:_taskname,tasktime:_tasktime,taskdate:_taskdate,})
      console.log("State",this.state)
    }

    changeHandler = e =>{
      this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = e =>{
      e.preventDefault()
      console.log(this.state) 
      fetch('http://localhost:3001/todo/edit',{
            method:'POST',
            mode:'cors',
            headers: {
            "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state)
      })      
      .then(response => response.json())
      .then(res => console.log(res))
    }

    render() { 
      var {username,taskdate,tasktime,taskname} = this.state
      console.log("State",this.state)
      return ( 
            <div className="col-8">
                  <div>
                        <form onSubmit={this.submitHandler}>
                              <input type="text" name="username"  value={username} placeholder="Username" onChange={this.changeHandler} required></input>
                              <input type="date" name="taskdate"  value={taskdate} placeholder="Date-of-Task(DD/MM/YYYY)" onChange={this.changeHandler} required></input>
                              <input type="time" name="tasktime"  value={tasktime} placeholder="Time-of-Task(HH:MM),(24 hours)" onChange={this.changeHandler} required></input>
                              <input type="text" name="taskname"  value={taskname} placeholder="Task-Name" onChange={this.changeHandler} required></input>
                              <input className="button" type="submit" value="Add"></input>
                        </form>
                  </div>
            </div>
      );
    }
  }
   
  export default Edit;
  