import React, { Component } from "react";
import { Field, reduxForm }from "redux-form";
import {Link} from "react-router-dom";
import {createPost} from "../actions/";
import {connect} from "react-redux";
import {bindActionCreators, dispatch} from "redux";
import PropTypes  from "prop-types";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/dom/ajax";

class PostsNew extends Component {

    state = {
        theForm: {
            resStatusCode: 0
        }
    }

    renderField = (field) => {
        //instead of using this longer declaration
        // const className = `form-group ${field.meta.touched && field.meta.error ? "has-danger" : ""}`;
        //we can using destructuring
        //this is how it works destructuring on nested objects
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    // onChange = {field.input.onChange}
                    // onFocus = {field.input.onFocus}
                    // onBlur={field.input.onBlur}
                    // etc...
                    // can be condensed as
                    {...field.input}
                />
                <div className="text-help">{field.meta.touched ? field.meta.error : ""}</div>
            </div>
        ); 
    }
    
    onSubmit = (values) => {
        let statusCode$ = Observable.create(
            (observer)=> {
                observer.next(
                    this.props.createPost(values)
                );

                observer.complete();
      
            }
        );

        statusCode$.delay(500).subscribe(()=>{
            this.props.history.push("/");
        });
    }
 
    render () {
        //equivalent to const handleSubmit = this.props.handleSubmit using ES6 destructuring feature
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field 
                    name="title"
                    label="Title"
                    component={this.renderField}
                />
                <Field
                    name="categories"
                    label="Categories"
                    component={this.renderField}
                />
                <Field
                   name="content"
                   label="Post Content"
                   component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

const validate =  (values) => {
    const errors = {};
    if (!values.title) {
        // (() => {console.log("test");})();
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }
    return errors;
};
function mapDispatchToProps (dispatch) {
    return {
        createPost: (values) => {
          dispatch(createPost(values));
        }
    };
}
function mapStateToProps(state) {
    return {
        resStatusCode: state.theForm && state.theForm.resStatusCode ? state.theForm.resStatusCode : 0
    };
}

export default reduxForm(
    {
        validate,
        form: "PostsNewForm"
    }
)(connect(mapStateToProps, mapDispatchToProps)(PostsNew));