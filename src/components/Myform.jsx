import React, { Component } from 'react';
import {Row} from 'reactstrap';

class MyForm extends React.Component {
    state = {  }
    render() { 
      return ( 
        <div>
          <form>
            <Row><input type="name" placeholder="Username"></input></Row>
            <Row><input type="name" placeholder="Date-of-Task"></input></Row>
            <Row><input type="name" placeholder="Time-of-Task"></input></Row>
            <Row><input type="name" placeholder="Task-Name"></input></Row>
            <Row><input type="submit" value="Add"></input></Row>
          </form>
        </div>
       );
    }
  }
  export default MyForm;