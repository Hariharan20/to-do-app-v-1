import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

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

  render() {
    return (
      <TableContainer component={Paper}>
      <Table className={useStyles.Table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date&nbsp;(DD/MM/YY)</TableCell>
            <TableCell align="right">Time&nbsp;(HH:MM)</TableCell>
            <TableCell align="right">Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.username}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.taskdate}</TableCell>
              <TableCell align="right">{row.tasktime}</TableCell>
              <TableCell align="right">{row.taskname}</TableCell>
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
