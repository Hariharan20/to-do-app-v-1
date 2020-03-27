import React from 'react';
import {Row} from 'reactstrap';

class MyForm extends React.Component {
    constructor(props){ 
      super(props) 
      this.state = { 
          username:'',
          date:'',
          time:'',
          taskname:''
        }
    }

    changeHandler = e =>{
      this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = e =>{
      e.preventDefault()
      console.log(this.state) 
      fetch('http://localhost:3001/auth',{
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
      const {username,date,time,taskname} = this.state
      return ( 
        <div>
          <form onSubmit={this.submitHandler}>
            <Row><input type="text" name="username"  value={username} placeholder="Username" onChange={this.changeHandler}></input>
            <input type="date" name="date"  value={date} placeholder="Date-of-Task(DD/MM/YYYY)" onChange={this.changeHandler}></input></Row>
            <Row><input type="time" name="time"  value={time} placeholder="Time-of-Task(HH:MM),(24 hours)" onChange={this.changeHandler}></input>
            <input type="text" name="taskname"  value={taskname} placeholder="Task-Name" onChange={this.changeHandler}></input></Row>
            <Row><input type="submit" value="Add"></input></Row>
          </form>
        </div>
       );
    }
  }
  export default MyForm;