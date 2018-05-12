import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Delete extends Component {

  constructor() {
	super();
	this.onClick = this.onClick.bind(this);
	this.delete = this.delete.bind(this);
  }
  
  onClick(e){
     this.delete(this);
    }
	
	delete(e){
		axios.delete('/api/post/'+ this.props.expense._id)
			.then((result) => { 
				console.log('post deleted');
				this.props.history = this.props.history || [];
				this.props.history.back("/")
			});
	}
	
  render() {
    return (
		<Button bsStyle="danger" onClick={this.onClick}>
			<i class="fa fa-trash-o"></i>
		</Button>
    );
  }
}

export default Delete;