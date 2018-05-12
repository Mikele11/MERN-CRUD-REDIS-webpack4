import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';

class Update extends Component {

  constructor() {
    super();
	  this.state = {
		open: false
	};
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  
  	onClick(e){
    }
  onSubmit = (e) => {
    e.preventDefault();

    const { date, author, description } = this.state;

    axios.put('/api/post/'+this.props.expense._id, { date, author, description })
      .then((result) => {
      });
	this.setState({ open: false });
  }

 
  onOpenModal = () => {
    this.setState({ open: true });
		axios.get('/api/post/'+ this.props.expense._id)
		.then(response => {
		  this.setState({ author: response.data.author });
		  this.setState({ description: response.data.description });
		})
		.catch(function (error) {
		  console.log(error);
		})
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  render() {
	const {open,author,description} = this.state;
    return (
      <div>
        <button class="btn btn-warning" onClick={this.onOpenModal}>Update<i class="glyphicon glyphicon-edit"></i></button>
        <Modal open={open} onClose={this.onCloseModal} center>
		
			<div class="container">
			<div class="panel panel-default">
			  <div class="panel-heading">
				<h3 class="panel-title">
				  Update Post
				</h3>
			  </div>
			  <div class="panel-body">
				<form onSubmit={this.onSubmit}>
				  <div class="form-group">
					<label for="author">Author:</label>
					<input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
				  </div>
				  <div class="form-group">
					<label for="description">Description:</label>
					<textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
				  </div>
				  <button type="submit" class="btn btn-default">Submit</button>
				</form>
			  </div>
			</div>
		  </div>
		  
        </Modal>
      </div>
    );
  }
}
export default Update;
