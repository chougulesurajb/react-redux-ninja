import React, { Component } from 'react';
import { connect } from "react-redux";
// import "bootstrap" 
import { Link } from 'react-router-dom';

class Office extends Component {
    render() {
        const { posts } = this.props
        console.log("Home posts", posts);
        let allPosts = posts.map(post => {
            return (
                <div className="card ">
                    <div key={post.id}>
                        {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                            <Link to={`/post/${post.id}`} className="btn btn-primary">{post.id}</Link>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="flex-container" >
                {allPosts}
            </div>
        );
    }
}
const mapStateToStore = (state) => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToStore)(Office);
