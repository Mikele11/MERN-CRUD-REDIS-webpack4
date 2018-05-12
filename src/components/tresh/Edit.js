import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

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

  onChange = (e) => {
    const state = this.state.post
    state[e.target.name] = e.target.value;
    this.setState({post:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { date, author, description} = this.state.post;

    axios.put('/api/post/'+this.props.match.params.id, { date, author, description })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT POST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.post._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> post List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.post.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.post.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
