import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MyForm.css'

class SimpleTable  extends React.Component {
  constructor(){
    super();
    this.state = { 
      rows : []  
    };
  }
  
  componentDidMount() {
    fetch('http://localhost:3001/todo',{
      method:'GET'}
    )
    .then(response => response.json())
    .then((Data) => {
      // jsonData is parsed json object received from url
      console.log(Data)
      this.setState({rows:Data})
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  
  }

  deleteData(row) {
    console.log(row)
    fetch('http://localhost:3001/todo/delete',{
        method:'POST',
        mode:'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(row)
      })      
      .then(response => response.json())
      .then(res => console.log(res));
  }
  
  editData(row) {
    console.log(row)
    fetch('http://localhost:3001/todo/convert',{
        method:'POST',
        mode:'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(row)
      })
    .then(response => response.json())
    .then((Data) => {
      // jsonData is parsed json object received from url
      console.log("We get ",Data)
      localStorage.setItem('username',JSON.stringify(Data.username));
      localStorage.setItem('taskid',JSON.stringify(Data.taskid));
      localStorage.setItem('taskdate',JSON.stringify(Data.taskdate));
      localStorage.setItem('tasktime',JSON.stringify(Data.tasktime));
      localStorage.setItem('taskname',JSON.stringify(Data.taskname));
      this.props.history.push({pathname:'/edit'})
    })
  }

  render() {
    return (
      <TableContainer component={Paper}>
      <Table style={{backgroundColor:'#000',minWidth:550,}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}}>ID</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">NAME</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">DATE&nbsp;(DD/MM/YY)</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">TIME&nbsp;(HH:MM)</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">TASK</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">EDIT</TableCell>
            <TableCell style={{color:'#FFF',fontFamily:'Montserrat',}} align="right">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.taskid}>
              <TableCell style={{color:'#FFF',fontFamily:'Comfortaa',}} component="th" scope="row">
                {row.taskid}
              </TableCell>
              <TableCell style={{color:'#FFF',fontFamily:'Comfortaa',}} align="right">{row.username}</TableCell>
              <TableCell style={{color:'#FFF',fontFamily:'Comfortaa',}} align="right">{row.taskdate}</TableCell>
              <TableCell style={{color:'#FFF',fontFamily:'Comfortaa',}} align="right">{row.tasktime}</TableCell>
              <TableCell style={{color:'#FFF',fontFamily:'Comfortaa',}} align="right">{row.taskname}</TableCell>
              <TableCell align="right"><Button variant="contained" color="primary" onClick={this.editData.bind(this,row)}>Edit</Button></TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" onClick={this.deleteData.bind(this,row)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      );
  }
}
 
export default SimpleTable;



/* */
