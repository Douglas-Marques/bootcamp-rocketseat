import React, { Component } from 'react'
import './Post.css'
import Comment from './Comment'

class Post extends Component {
  state = {
    post: {}
  }

  UNSAFE_componentWillMount() {
    this.setState({ post: this.props.data })
  }

  render() {
    return (
      <>
        <div className="post">
          <img src={this.state.post.author.avatar} alt="Foto de perfil" className="post-perfil" />
          <div className="post-name">{this.state.post.author.name}</div>
          <div className="post-date">{this.state.post.date}</div>
          <div className="post-content">{this.state.post.content}</div>
          <hr />
          {this.state.post.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
      </>
    )
  }
}

export default Post
