    import { fetchPosts  } from '../actions';
    import React, {Component} from 'react';
    import {bindActionCreators, dispatch} from 'redux';
    import {connect} from 'react-redux';
    import PropTypes  from 'prop-types';
    import map from 'lodash/fp/map';
    import flatten from 'lodash/fp/flatten';
    import sortBy from 'lodash/fp/sortBy';
    import compose from 'lodash/fp/compose';
    import take from 'lodash/fp/take';
    import _ from 'lodash';


    class PostsIndex extends Component {

    state = {
        posts: []
    };

        componentDidMount() {

            this.props.fetchPosts();


        }

        displayPosts () {
            //console.log(post) works, console.log(post.title) returns undefined.
            return  _.map(this.props.posts, (post)=>{return <div>{post.title}</div>;});
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
            posts: (state.posts) ? state.posts : []
        };
    }

    function mapDispatchToProps (dispatch) {
        return  bindActionCreators({fetchPosts: fetchPosts}, dispatch);
       }

    export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);