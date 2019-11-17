import React, { Component } from 'react'
import './Comment.css'

class Comment extends Component {
  state = {
    comment: {}
  }

  UNSAFE_componentWillMount() {
    this.setState({ comment: this.props.data })
  }

  render() {
    return (
      <>
        <img className="comment-avatar" src={this.state.comment.author.avatar} alt="Foto de perfil" />
        <div className="comment-container">
          <div className="comment-content">
            <span className="comment-name">{this.state.comment.author.name}</span>
            {this.state.comment.content}
          </div>
        </div>
      </>
    )
  }
}

export default Comment
