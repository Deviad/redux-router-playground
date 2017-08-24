import { fetchPosts  } from "../actions";
import React, {Component} from "react";
import {bindActionCreators, dispatch} from "redux";
import {connect} from "react-redux";
import PropTypes  from "prop-types";
import {Link} from "react-router-dom";
import withRouter from "react-router-dom/es/withRouter";

    class PostsIndex extends Component {

    state = {
        posts: {}
    };

        componentDidMount() {

            this.props.fetchPosts();
            console.log(this.props.history);

        }

        displayPosts () {
           
                return (
                    <div>      
                        <div className="text-xs-right">
                            <Link className="btn btn-primary" to="/posts/new">Add Post</Link>
                        </div>
                        <h3>Posts</h3>
                        <ul className="list-group">
                            {Object.values(this.props.posts).map((post)=>{return (
                                <li className="list-group-item" key={post.id}>{post.title}</li>
                            ); })}
                        </ul>
                    </div>
                );
        }
        render() {
            if(this.props.posts.length === 0) {
                return (<div>Loading...</div>);
            }
            return (<ul>{this.displayPosts()}</ul>);
        }
    }

    function mapStateToProps(state) {
        return {
            posts: Object.values(state.posts)
        };
    }

    function mapDispatchToProps (dispatch) {
        return  bindActionCreators({fetchPosts: fetchPosts}, dispatch);
       }

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsIndex));