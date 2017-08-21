import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "rxjs";
import PostsIndex from "./containers/posts_index";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configureStore";
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <div>
        <Route path="/postsindex" component={PostsIndex} />
    </div>
</BrowserRouter>
    </Provider>, 
document.getElementById("root"));
registerServiceWorker();
