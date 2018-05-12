import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    axios.get('/api/post/'+this.props.match.params.id)
      .then(res => {
        this.setState({ post: res.data });
        console.log(this.state.post);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/post/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.post.author}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> post List</Link></h4>
            <dl>
              <dt>Date:</dt>
              <dd>{this.state.post.date}</dd>
              <dt>Author:</dt>
              <dd>{this.state.post.author}</dd>
              <dt>Description:</dt>
              <dd>{this.state.post.description}</dd>
            </dl>
            <Link to={`/edit/${this.state.post._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.post._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
