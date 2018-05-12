import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Showcomment from './components/Showcomment';
import CreateCom from './components/CreateCom';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/post')
      .then(res => {
        this.setState({ posts: res.data });
		//console.log(this.state.posts);
      })
      .catch((error) => {
          this.props.history.push("/login");      
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
    onDelete(index){
		axios.delete('/api/post/'+ this.state.posts[index]._id)
			.then((result) => { 
				console.log('post deleted');

				axios.get('/api/post')
					.then(res => {
						this.setState({ posts: res.data });
					})
					.catch((error) => {
						console.log('error');
					});
			});
	}
	onUpdate(index){
		window.id= this.state.posts[index]._id;
	}
    onAddComment(index){
		window.id = this.state.posts[index]._id
	}
    onShowComment(index){
		window.id = this.state.posts[index]._id
	}
//<Update expense={post}/>	 <Showcomment postdata={comment} />
/*
<button class="btn btn-primary" onClick={this.onAddComment.bind(this,index)}><Link to="/addcomment">add comments</Link></button>
*/
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BLOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Post</Link></h4>
            <div>
                {this.state.posts.map((post,index)  =>
                  <div class="article">
				    <div class ="article_date">
						<div>Recording time: </div>
						<div>{post.date}</div>
					</div>
                    <div>{post.description}</div>
				    <div class ="article_author">
						<div>Author: </div>
						<div>{post.author}</div>
					</div>
					<div class ="article_author">                                                    
						<div><Link to="/showcomment" onClick={this.onShowComment.bind(this,index)}>Comments: </Link></div>
						<div>{post.comment.length}</div>
					</div>
					<div class ="article_buttons">
						<div>
							<button class="btn btn-warning" onClick={this.onUpdate.bind(this,index)}><Link to="/update">Update<i class="glyphicon glyphicon-edit"></i></Link></button>
						</div>
						<div><button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
						<div>
							<button class="btn btn-primary" onClick={this.onAddComment.bind(this,index)}><Link to="/addcomment">add comments</Link></button>
						</div>
					</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
