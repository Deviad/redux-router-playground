import React, { Component } from "react";
import {fetchPostsWithId, deletePostsWithId} from "../actions";
import { connect } from "react-redux";
import { dispatch } from "redux";
import PropTypes  from "prop-types";
import withRouter from "react-router-dom/es/withRouter";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";


class PostsShow extends Component {


        state = {
            post: {}
        };

        componentDidMount() {
            const { id } = this.props.match.params;
            this.props.fetchPostsWithId(id);



        }

        onDeleteClick = () => {
            const { id } = this.props.match.params;
            this.props.deletePostsWithId(id);
        };

        displayPosts () {
            let {post} = this.props;

                return (
                    <div>
                        <Link to="/">Back to Index</Link>
                        <button
                            className="btn btn-danger pull-xs-right"
                            onClick={this.onDeleteClick}
                        >Delete Post</button>
                        <h3>{post.title}</h3>
                        <h6>Categories: {post.categories}</h6>
                        <p>{post.content}</p>
                    </div>
                );
        }
        render() {
            if(!this.props.post) {
                return (<div>Loading...</div>);
            }
            else {
                return (<ul>{this.displayPosts()}</ul>);
            }
        }
    }


function mapDispatchToProps (dispatch) {
    return {
        fetchPostsWithId: (values) => {
          dispatch(fetchPostsWithId(values));
        },
        deletePostsWithId: (values) => {
            dispatch(deletePostsWithId(values));
        }
    };
}
function mapStateToProps({posts}, ownProps) {
    console.log(posts[ownProps.match.params.id]);
    return {
        post: posts[ownProps.match.params.id]
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsShow));