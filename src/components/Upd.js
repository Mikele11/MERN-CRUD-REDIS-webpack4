import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Update extends Component {

  constructor() {
    super();
    this.state = {
	  id:window.id,
      date: new Date(),
      author: '',
      description: ''
    };
  }
  
 componentDidMount() {
	axios.get('/api/post/'+id)
      .then(res => {
		if (typeof res.data == 'string'){
			let buf = res.data.substring(res.data.indexOf('author'),res.data.indexOf('description'));
			let aut = buf.substring(0,buf.indexOf(','));
			let aut2 = aut.substring(9,aut.length-1);
			buf = res.data.substring(res.data.indexOf('description'),res.data.indexOf('__v'));
			let desc = buf.substring(0,buf.indexOf(','));
			let desc2 = desc.substring(14,desc.length-1);
			this.setState({ author: aut2 });
			this.setState({ description: desc2 });	
		}else{
			this.setState({ author: res.data.author });
			this.setState({ description: res.data.description });		
		}
      })
      .catch((error) => {
          this.props.history.push("/login");      
      });
  }
  
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
		  
    const { id,date, author, description } = this.state;

    axios.put('/api/post/'+id, { date, author, description})
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { date, author, description } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Update POST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Post List</Link></h4>
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
    );
  }
}

export default Update;