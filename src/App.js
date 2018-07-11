import React, { Component } from 'react';
import 'bootstrap-css-only'

import NewComment from './NewComment'
import Comments from './Comments'


class App extends Component {
  constructor(props) {
    super(props)
    this.postNewComment = this.postNewComment.bind(this)
    this.state = {
      comments: {
      },
      isLoggedIn: false,
      user: {}
    }

    this.refComments = this.props.base.syncState('comments', {
      context: this,
      state: 'comments'
    })
    this.props.auth.onAuthStateChanged((user)=>{
      if(user){
        this.setState({ isLoggedIn: true, user })
      }else{
        this.setState({ isLoggedIn: false, user: {} })
      }
    })
  }
  postNewComment(comment) {
    comment.user = { 
      uid: this.state.user.uid,
      name: this.state.user.displayName
    }
    const comments = { ...this.state.comments }
    const timeStamp = Date.now()
    comments[`comm-${timeStamp}`] = comment
    this.setState({
        comments: comments
      })
  }
  auth(provider) {
    this.props.auth.signInWithPopup(this.props.providers[provider])
  }
  render() {
    return (
      <div className="container">
        { this.state.isLoggedIn &&
        <div>
          { this.state.user.displayName }
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <button onClick={() => this.props.auth.signOut()}>Deslogar</button>
          <NewComment postNewComment={ this.postNewComment } />
        </div>
        }
        { !this.state.isLoggedIn &&
          <div className="alert alert-info">
            <button onClick={() => this.auth('facebook')}>Entre com o facebook para comentar</button>
          </div>
        }
        <Comments comments={ this.state.comments } />
      </div>
    );
  }
}

export default App;
