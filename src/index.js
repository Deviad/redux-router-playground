import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { BrowserRouter, Route , Switch} from "react-router-dom";
import {Switch} from "react-router-dom";

import { Route } from "react-router";
import "rxjs";
import PostsIndex from "./containers/posts_index";
import PostsNew from "./containers/posts_new";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configureStore";
import NotFound from "./components/not_found";
import { ConnectedRouter, push } from "react-router-redux";
import {history} from "./history_factory";
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <div>
        <Switch>
            <Route exact path="/" component={PostsIndex} />
            <Route exact path="/posts/new" component={PostsNew} />
            <Route exact path="*" component={NotFound} />
        </Switch>
    </div>
 </ConnectedRouter>
    </Provider>, 
document.getElementById("root"));
registerServiceWorker();
