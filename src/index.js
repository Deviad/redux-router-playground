import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import "rxjs";
import PostsIndex from "./containers/posts_index";
import PostsNew from "./containers/posts_new";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configureStore";
import NotFound from "./components/not_found";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <div>
        <Switch>
            <Route exact path="/" component={PostsIndex} />
            <Route exact path="/posts/new" component={PostsNew} />
            <Route exact path="*" component={NotFound} />
       </Switch>
    </div>
</BrowserRouter>
    </Provider>, 
document.getElementById("root"));
registerServiceWorker();
