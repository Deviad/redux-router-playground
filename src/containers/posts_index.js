    import { fetchPosts  } from "../actions";
    import React, {Component} from "react";
    import {bindActionCreators, dispatch} from "redux";
    import {connect} from "react-redux";
    import PropTypes  from "prop-types";


    class PostsIndex extends Component {

    state = {
        posts: {}
    };

        componentDidMount() {

            this.props.fetchPosts();


        }


        displayPosts () {
            return  Object.values(this.props.posts).map((post)=>{
                return (<div key={post.id}>{post.title}</div>);
            });
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

    export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);