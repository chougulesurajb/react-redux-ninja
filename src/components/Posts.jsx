import React, { Component } from 'react';
import { connect } from "react-redux";
// import "bootstrap" 

class Post extends Component {
    render() {
        const { post } = this.props
        console.log("Home posts", post);

        return (
            <div className="container ">
                <h1>Posts</h1>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        );
    }
}
const mapStateToStore = (state, ownProps) => {
    let id = ownProps.match.params.post_id
    return {
        post: state.posts.find(post => post.id === id)
    }
}
export default connect(mapStateToStore)(Post);
